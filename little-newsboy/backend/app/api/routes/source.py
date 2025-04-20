from typing import List, Optional
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, get_db
from app.db.models.source import SourceType, Status, UpdateFrequency, Priority
from app.db.models.user import User
from app.db.repositories.source import (
    create_source,
    delete_source,
    get_source_by_id,
    get_sources,
    count_sources,
    update_source,
)
from app.schemas.source import Source, SourceCreate, SourcesPage, SourceUpdate

router = APIRouter(
    prefix="/source",
    tags=["source"],
)


@router.get("/{source_id}", response_model=Source)
def get_source(
    source_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """获取单个信息源详情"""
    source = get_source_by_id(db, source_id)
    if not source:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="信息源不存在"
        )
    if str(source.user_id) != str(current_user.id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="没有权限访问此信息源"
        )
    return source


@router.get("/", response_model=SourcesPage)
def list_sources(
    skip: int = 0,
    limit: int = 10,
    search: Optional[str] = None,
    source_type: Optional[SourceType] = None,
    status: Optional[Status] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """获取信息源列表（分页）"""
    sources = get_sources(
        db, 
        str(current_user.id),
        skip=skip,
        limit=limit,
        search=search,
        source_type=source_type,
        status=status
    )
    total = count_sources(
        db, 
        str(current_user.id),
        search=search,
        source_type=source_type,
        status=status
    )
    return {
        "items": sources,
        "total": total,
        "page": skip // limit + 1 if limit > 0 else 1,
        "size": limit,
        "page_size": limit,
        "total_pages": (total + limit - 1) // limit if limit > 0 else 1
    }


@router.post("/", response_model=Source, status_code=status.HTTP_201_CREATED)
def create_new_source(
    source_data: SourceCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """创建新的信息源"""
    return create_source(db, source_data, str(current_user.id))


@router.post("", response_model=Source, status_code=status.HTTP_201_CREATED)
def create_new_source_no_slash(
    source_data: SourceCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """创建新的信息源（不带斜杠的URL）"""
    return create_new_source(source_data, db, current_user)


@router.put("/{source_id}", response_model=Source)
def update_existing_source(
    source_id: str,
    source_data: SourceUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """更新信息源"""
    source = update_source(db, source_id, source_data, str(current_user.id))
    if not source:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="信息源不存在或无权限修改"
        )
    return source


@router.delete("/{source_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_existing_source(
    source_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """删除信息源"""
    result = delete_source(db, source_id, str(current_user.id))
    if not result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="信息源不存在或无权限删除"
        )
    return None


@router.post("/{source_id}/refresh", status_code=status.HTTP_202_ACCEPTED)
def refresh_source(
    source_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """刷新信息源数据"""
    source = get_source_by_id(db, source_id)
    if not source:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="信息源不存在"
        )
    if str(source.user_id) != str(current_user.id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="没有权限访问此信息源"
        )
    
    # 这里可以添加实际的刷新逻辑，如发送到队列或后台任务
    # 例如：
    # background_tasks.add_task(refresh_source_data, source_id)
    
    return {"message": "刷新请求已接收，将在后台处理"}


@router.get("", response_model=SourcesPage)
def list_sources_no_slash(
    skip: int = 0,
    limit: int = 10,
    search: Optional[str] = None,
    source_type: Optional[SourceType] = None,
    status: Optional[Status] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """获取信息源列表（分页，不带斜杠的URL）"""
    return list_sources(skip, limit, search, source_type, status, db, current_user)


@router.put("/{source_id}", response_model=Source)
def update_existing_source_no_slash(
    source_id: str,
    source_data: SourceUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """更新信息源（不带斜杠的URL）"""
    return update_existing_source(source_id, source_data, db, current_user)


@router.delete("/{source_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_existing_source_no_slash(
    source_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """删除信息源（不带斜杠的URL）"""
    return delete_existing_source(source_id, db, current_user)


@router.post("/{source_id}/refresh", status_code=status.HTTP_202_ACCEPTED)
def refresh_source_no_slash(
    source_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """刷新信息源数据（不带斜杠的URL）"""
    return refresh_source(source_id, db, current_user) 