from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from typing import List, Optional
from uuid import UUID

from app.core.auth import get_current_user
from app.db.database import get_db
from app.db.models.source import SourceType, Status
from app.db.models.user import User
from app.db.repositories.source import (
    get_source_by_id,
    get_sources,
    count_sources,
    create_source,
    update_source,
    delete_source
)
from app.schemas.source import Source, SourceCreate, SourceUpdate, SourcesPage

router = APIRouter(prefix="/sources", tags=["sources"])


@router.get("", response_model=SourcesPage)
def read_sources(
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100),
    search: Optional[str] = None,
    source_type: Optional[SourceType] = None,
    status: Optional[Status] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """获取当前用户的信息源列表"""
    skip = (page - 1) * page_size
    sources = get_sources(
        db, current_user.id, skip, page_size, search, source_type, status
    )
    total = count_sources(db, current_user.id, search, source_type, status)
    return {
        "items": sources,
        "total": total,
        "page": page,
        "page_size": page_size,
        "pages": (total + page_size - 1) // page_size
    }


@router.get("/{source_id}", response_model=Source)
def read_source(
    source_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """获取单个信息源详情"""
    source = get_source_by_id(db, str(source_id))
    if not source:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="信息源不存在"
        )
    if str(source.user_id) != str(current_user.id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="没有权限访问该信息源"
        )
    return source


@router.post("", response_model=Source, status_code=status.HTTP_201_CREATED)
def create_new_source(
    source_data: SourceCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """创建新的信息源"""
    return create_source(db, source_data, current_user.id)


@router.put("/{source_id}", response_model=Source)
def update_existing_source(
    source_id: UUID,
    source_data: SourceUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """更新信息源"""
    updated_source = update_source(db, str(source_id), source_data, current_user.id)
    if not updated_source:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="信息源不存在或没有权限更新"
        )
    return updated_source


@router.delete("/{source_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_existing_source(
    source_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """删除信息源"""
    success = delete_source(db, str(source_id), current_user.id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="信息源不存在或没有权限删除"
        )
    return None


@router.post("/{source_id}/refresh", response_model=Source)
def refresh_source(
    source_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """刷新信息源（实际功能待实现）"""
    source = get_source_by_id(db, str(source_id))
    if not source:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="信息源不存在"
        )
    if str(source.user_id) != str(current_user.id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="没有权限刷新该信息源"
        )
    
    # 这里应该实现实际的刷新逻辑，例如重新抓取数据等
    # 目前只是返回现有信息源
    return source 