from typing import List, Optional, Dict, Any
from sqlalchemy.orm import Session
from sqlalchemy import desc, asc, func

from app.db.repositories.base import BaseRepository
from app.db.models.summary import Summary, SummaryTemplate
from app.schemas.summary import SummaryCreate, SummaryUpdate, SummaryTemplateCreate, SummaryTemplateUpdate


class SummaryRepository(BaseRepository[Summary, SummaryCreate, SummaryUpdate]):
    def __init__(self):
        super().__init__(Summary)
    
    def get_by_user_id(self, db: Session, *, user_id: str) -> List[Summary]:
        """获取用户的所有摘要"""
        return db.query(self.model).filter(self.model.user_id == user_id).all()
    
    def get_multi_paginated(
        self, 
        db: Session, 
        *, 
        user_id: str,
        skip: int = 0, 
        limit: int = 20,
        sort_field: str = "created_at",
        sort_order: str = "desc",
        tag: Optional[str] = None,
        search: Optional[str] = None,
        is_archived: Optional[bool] = None,
        is_important: Optional[bool] = None,
        source_id: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        分页获取摘要，支持排序、过滤和搜索
        """
        # 基础查询
        query = db.query(self.model).filter(self.model.user_id == user_id)
        
        # 应用过滤条件
        if tag:
            query = query.filter(self.model.tags.contains([tag]))
        
        if search:
            search_term = f"%{search}%"
            query = query.filter(
                (self.model.title.ilike(search_term)) | 
                (self.model.content.ilike(search_term))
            )
        
        if is_archived is not None:
            query = query.filter(self.model.is_archived == is_archived)
            
        if is_important is not None:
            query = query.filter(self.model.is_important == is_important)
            
        if source_id:
            query = query.filter(
                self.model.sources.any(id=source_id)
            )
        
        # 计算总数
        total = query.count()
        
        # 应用排序
        order_func = desc if sort_order.lower() == "desc" else asc
        if hasattr(self.model, sort_field):
            query = query.order_by(order_func(getattr(self.model, sort_field)))
        else:
            query = query.order_by(order_func(self.model.created_at))
        
        # 应用分页
        items = query.offset(skip).limit(limit).all()
        
        return {
            "items": items,
            "total": total,
            "page": skip // limit + 1,
            "size": limit,
            "page_size": limit,  # 兼容字段
            "total_pages": (total + limit - 1) // limit  # 兼容字段
        }
    
    def toggle_archived(self, db: Session, *, summary_id: str, user_id: str) -> Optional[Summary]:
        """切换摘要的归档状态"""
        summary = db.query(self.model).filter(
            self.model.id == summary_id,
            self.model.user_id == user_id
        ).first()
        
        if summary:
            summary.is_archived = not summary.is_archived
            db.add(summary)
            db.commit()
            db.refresh(summary)
        
        return summary
    
    def toggle_important(self, db: Session, *, summary_id: str, user_id: str) -> Optional[Summary]:
        """切换摘要的重要标记"""
        summary = db.query(self.model).filter(
            self.model.id == summary_id,
            self.model.user_id == user_id
        ).first()
        
        if summary:
            summary.is_important = not summary.is_important
            db.add(summary)
            db.commit()
            db.refresh(summary)
        
        return summary


class SummaryTemplateRepository(BaseRepository[SummaryTemplate, SummaryTemplateCreate, SummaryTemplateUpdate]):
    def __init__(self):
        super().__init__(SummaryTemplate)
    
    def get_by_user_id(self, db: Session, *, user_id: str) -> List[SummaryTemplate]:
        """获取用户的所有摘要模板"""
        return db.query(self.model).filter(self.model.user_id == user_id).all()
    
    def get_multi_paginated(
        self, 
        db: Session, 
        *, 
        user_id: str,
        skip: int = 0, 
        limit: int = 20,
        sort_field: str = "created_at",
        sort_order: str = "desc",
        search: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        分页获取摘要模板，支持排序和搜索
        """
        # 基础查询
        query = db.query(self.model).filter(self.model.user_id == user_id)
        
        # 应用搜索
        if search:
            search_term = f"%{search}%"
            query = query.filter(
                (self.model.name.ilike(search_term)) | 
                (self.model.description.ilike(search_term))
            )
        
        # 计算总数
        total = query.count()
        
        # 应用排序
        order_func = desc if sort_order.lower() == "desc" else asc
        if hasattr(self.model, sort_field):
            query = query.order_by(order_func(getattr(self.model, sort_field)))
        else:
            query = query.order_by(order_func(self.model.created_at))
        
        # 应用分页
        items = query.offset(skip).limit(limit).all()
        
        return {
            "items": items,
            "total": total,
            "page": skip // limit + 1,
            "size": limit,
            "page_size": limit,  # 兼容字段
            "total_pages": (total + limit - 1) // limit  # 兼容字段
        } 