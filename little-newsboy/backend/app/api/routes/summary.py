from typing import Any, List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, BackgroundTasks
from sqlalchemy.orm import Session
from starlette.status import HTTP_404_NOT_FOUND, HTTP_201_CREATED, HTTP_200_OK, HTTP_204_NO_CONTENT, HTTP_202_ACCEPTED
import asyncio

from app.api.deps import get_db, get_current_user
from app.db.models.user import User
from app.db.repositories.summary import SummaryRepository, SummaryTemplateRepository
from app.db.repositories.source import SourceRepository
from app.schemas.summary import (
    Summary, SummaryCreate, SummaryUpdate, SummariesPage,
    SummaryTemplate, SummaryTemplateCreate, SummaryTemplateUpdate,
    SummaryGenerateRequest
)
from app.services.ai import ai_service, SummaryRequest, SummaryResult


router = APIRouter()
summary_repository = SummaryRepository()
template_repository = SummaryTemplateRepository()
source_repository = SourceRepository()


@router.get("/", response_model=SummariesPage)
@router.get("", response_model=SummariesPage)
def get_summaries(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    sort_field: str = Query("created_at"),
    sort_order: str = Query("desc"),
    tag: Optional[str] = None,
    search: Optional[str] = None,
    is_archived: Optional[bool] = None,
    is_important: Optional[bool] = None,
    source_id: Optional[str] = None
) -> Any:
    """获取摘要列表（分页）"""
    skip = (page - 1) * page_size
    return summary_repository.get_multi_paginated(
        db,
        user_id=current_user.id,
        skip=skip,
        limit=page_size,
        sort_field=sort_field,
        sort_order=sort_order,
        tag=tag,
        search=search,
        is_archived=is_archived,
        is_important=is_important,
        source_id=source_id
    )


@router.get("/{summary_id}", response_model=Summary)
def get_summary(
    summary_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> Any:
    """获取单个摘要详情"""
    summary = summary_repository.get(db, id=summary_id)
    if not summary or summary.user_id != current_user.id:
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND,
            detail="摘要不存在或无权访问"
        )
    return summary


@router.post("/", response_model=Summary, status_code=HTTP_201_CREATED)
@router.post("", response_model=Summary, status_code=HTTP_201_CREATED)
def create_summary(
    summary_in: SummaryCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> Any:
    """创建新摘要"""
    # 创建摘要，但先不保存source关联
    summary_data = summary_in.model_dump()
    source_ids = summary_data.pop('source_ids', [])
    
    # 创建摘要
    summary = summary_repository.create(
        db, 
        obj_in=SummaryCreate(**summary_data),
        user_id=current_user.id
    )
    
    # 添加source关联
    if source_ids:
        for source_id in source_ids:
            source = source_repository.get(db, id=source_id)
            if source and source.user_id == current_user.id:
                summary.sources.append(source)
        
        db.add(summary)
        db.commit()
        db.refresh(summary)
    
    return summary


@router.put("/{summary_id}", response_model=Summary)
def update_summary(
    summary_id: str,
    summary_in: SummaryUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> Any:
    """更新摘要"""
    summary = summary_repository.get(db, id=summary_id)
    if not summary or summary.user_id != current_user.id:
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND,
            detail="摘要不存在或无权访问"
        )
    
    # 处理source_ids更新
    if summary_in.source_ids is not None:
        # 清除现有关联
        summary.sources = []
        
        # 添加新关联
        for source_id in summary_in.source_ids:
            source = source_repository.get(db, id=source_id)
            if source and source.user_id == current_user.id:
                summary.sources.append(source)
        
        # 从更新数据中移除source_ids，因为它不是模型的直接属性
        update_data = summary_in.model_dump(exclude_unset=True)
        if 'source_ids' in update_data:
            del update_data['source_ids']
        
        # 更新其他字段
        summary = summary_repository.update(
            db,
            db_obj=summary,
            obj_in=update_data
        )
    else:
        # 如果没有提供source_ids，正常更新
        summary = summary_repository.update(
            db,
            db_obj=summary,
            obj_in=summary_in
        )
    
    return summary


@router.delete("/{summary_id}", status_code=HTTP_204_NO_CONTENT)
def delete_summary(
    summary_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> None:
    """删除摘要"""
    summary = summary_repository.get(db, id=summary_id)
    if not summary or summary.user_id != current_user.id:
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND,
            detail="摘要不存在或无权访问"
        )
    summary_repository.remove(db, id=summary_id)


@router.post("/{summary_id}/archive", response_model=Summary)
def toggle_archive_summary(
    summary_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> Any:
    """切换摘要归档状态"""
    summary = summary_repository.toggle_archived(
        db, 
        summary_id=summary_id, 
        user_id=current_user.id
    )
    
    if not summary:
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND,
            detail="摘要不存在或无权访问"
        )
    
    return summary


@router.post("/{summary_id}/important", response_model=Summary)
def toggle_important_summary(
    summary_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> Any:
    """切换摘要重要标记"""
    summary = summary_repository.toggle_important(
        db, 
        summary_id=summary_id, 
        user_id=current_user.id
    )
    
    if not summary:
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND,
            detail="摘要不存在或无权访问"
        )
    
    return summary


# 异步生成摘要的后台任务
async def generate_summary_task(
    source_ids: List[str],
    template_id: Optional[str],
    parameters: dict,
    user_id: str,
    db: Session
):
    # 这里应该使用一个新的session，因为我们在一个新线程中
    # 实际项目中应该使用适当的工具来管理这个会话
    # 为了简化，这里直接使用传入的会话
    
    try:
        # 获取源信息内容（实际项目中应该实现抓取源内容的机制）
        content = "这是从信息源获取的示例内容，实际应用中应从源获取真实内容。"
        
        # 应用模板参数（如果有的话）
        if template_id:
            template = template_repository.get(db, id=template_id)
            if template and template.user_id == user_id:
                # 合并模板参数和请求参数
                template_params = template.parameters
                merged_params = {**template_params, **parameters}
                parameters = merged_params
        
        # 调用AI服务生成摘要
        summary_request = SummaryRequest(
            content=content,
            max_length=parameters.get("max_length", 2000),
            focus_points=parameters.get("focus_points", []),
            format=parameters.get("format", "markdown")
        )
        
        summary_result = await ai_service.generate_summary(summary_request)
        
        # 创建摘要记录
        summary_create = SummaryCreate(
            title=f"摘要 {', '.join(source_ids)[:30]}...",  # 简单的标题生成
            content=summary_result.summary,
            key_points=summary_result.key_points,
            tags=parameters.get("tags", []),
            source_ids=source_ids,
            user_id=user_id
        )
        
        summary = summary_repository.create(db, obj_in=summary_create)
        
        # 添加source关联
        for source_id in source_ids:
            source = source_repository.get(db, id=source_id)
            if source and source.user_id == user_id:
                summary.sources.append(source)
        
        db.add(summary)
        db.commit()
        
        return summary
    except Exception as e:
        # 记录错误（实际项目中应使用日志系统）
        print(f"摘要生成失败：{str(e)}")
        return None


@router.post("/generate", response_model=dict, status_code=HTTP_202_ACCEPTED)
def generate_summary(
    request: SummaryGenerateRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> Any:
    """异步生成摘要（从信息源）"""
    # 验证source_ids是否属于当前用户
    valid_source_ids = []
    for source_id in request.source_ids:
        source = source_repository.get(db, id=source_id)
        if source and source.user_id == current_user.id:
            valid_source_ids.append(source_id)
    
    if not valid_source_ids:
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND,
            detail="未找到有效的信息源"
        )
    
    # 验证模板（如果提供）
    if request.template_id:
        template = template_repository.get(db, id=request.template_id)
        if not template or template.user_id != current_user.id:
            raise HTTPException(
                status_code=HTTP_404_NOT_FOUND,
                detail="摘要模板不存在或无权访问"
            )
    
    # 添加后台任务
    background_tasks.add_task(
        generate_summary_task,
        valid_source_ids,
        request.template_id,
        request.parameters or {},
        current_user.id,
        db
    )
    
    return {"message": "摘要生成请求已接受，将在后台处理"}


@router.get("/templates", response_model=List[SummaryTemplate])
def get_summary_templates(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> Any:
    """获取摘要模板列表"""
    return template_repository.get_multi(db, user_id=current_user.id)


@router.get("/templates/{template_id}", response_model=SummaryTemplate)
def get_summary_template(
    template_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> Any:
    """获取单个摘要模板详情"""
    template = template_repository.get(db, id=template_id)
    if not template or template.user_id != current_user.id:
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND,
            detail="摘要模板不存在或无权访问"
        )
    return template


@router.post("/templates", response_model=SummaryTemplate, status_code=HTTP_201_CREATED)
def create_summary_template(
    template_in: SummaryTemplateCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> Any:
    """创建新摘要模板"""
    template = template_repository.create(
        db, 
        obj_in=template_in,
        user_id=current_user.id
    )
    return template


@router.put("/templates/{template_id}", response_model=SummaryTemplate)
def update_summary_template(
    template_id: str,
    template_in: SummaryTemplateUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> Any:
    """更新摘要模板"""
    template = template_repository.get(db, id=template_id)
    if not template or template.user_id != current_user.id:
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND,
            detail="摘要模板不存在或无权访问"
        )
    
    template = template_repository.update(
        db,
        db_obj=template,
        obj_in=template_in
    )
    return template


@router.delete("/templates/{template_id}", status_code=HTTP_204_NO_CONTENT)
def delete_summary_template(
    template_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> None:
    """删除摘要模板"""
    template = template_repository.get(db, id=template_id)
    if not template or template.user_id != current_user.id:
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND,
            detail="摘要模板不存在或无权访问"
        )
    template_repository.remove(db, id=template_id) 