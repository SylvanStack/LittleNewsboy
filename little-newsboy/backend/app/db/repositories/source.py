from typing import List, Optional, Dict, Any
from sqlalchemy.orm import Session
from sqlalchemy import desc

from app.db.models.source import Source, SourceType, UpdateFrequency, Priority, Status
from app.schemas.source import SourceCreate, SourceUpdate


class SourceRepository:
    def get(self, db: Session, id: str) -> Optional[Source]:
        """通过ID获取信息源"""
        return db.query(Source).filter(Source.id == id).first()

    def get_multi(
        self, 
        db: Session, 
        user_id: str,
        skip: int = 0, 
        limit: int = 100,
        search: Optional[str] = None,
        source_type: Optional[SourceType] = None,
        status: Optional[Status] = None,
    ) -> List[Source]:
        """获取用户的所有信息源"""
        query = db.query(Source).filter(Source.user_id == user_id)
        
        # 应用搜索过滤
        if search:
            query = query.filter(Source.name.ilike(f"%{search}%"))
        
        # 按类型过滤
        if source_type:
            query = query.filter(Source.type == source_type)
        
        # 按状态过滤
        if status:
            query = query.filter(Source.status == status)
        
        # 排序并分页
        return query.order_by(desc(Source.created_at)).offset(skip).limit(limit).all()

    def count(
        self, 
        db: Session, 
        user_id: str,
        search: Optional[str] = None,
        source_type: Optional[SourceType] = None,
        status: Optional[Status] = None,
    ) -> int:
        """计算符合条件的信息源总数"""
        query = db.query(Source).filter(Source.user_id == user_id)
        
        # 应用搜索过滤
        if search:
            query = query.filter(Source.name.ilike(f"%{search}%"))
        
        # 按类型过滤
        if source_type:
            query = query.filter(Source.type == source_type)
        
        # 按状态过滤
        if status:
            query = query.filter(Source.status == status)
        
        return query.count()

    def create(self, db: Session, obj_in: SourceCreate, user_id: str) -> Source:
        """创建新信息源"""
        db_source = Source(
            name=obj_in.name,
            type=obj_in.type,
            url=obj_in.url,
            update_frequency=obj_in.update_frequency,
            priority=obj_in.priority,
            status=obj_in.status,
            filters=obj_in.filters,
            credentials=obj_in.credentials,
            user_id=user_id,
        )
        db.add(db_source)
        db.commit()
        db.refresh(db_source)
        return db_source

    def update(self, db: Session, db_obj: Source, obj_in: SourceUpdate) -> Source:
        """更新现有信息源"""
        update_data = obj_in.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_obj, key, value)
        
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def remove(self, db: Session, id: str) -> bool:
        """删除信息源"""
        db_source = self.get(db, id=id)
        
        if not db_source:
            return False
        
        db.delete(db_source)
        db.commit()
        return True


# 保留旧的函数接口以保持兼容性
def get_source_by_id(db: Session, source_id: str) -> Optional[Source]:
    """通过ID获取信息源"""
    return SourceRepository().get(db, id=source_id)

def get_sources(
    db: Session, 
    user_id: str,
    skip: int = 0, 
    limit: int = 100,
    search: Optional[str] = None,
    source_type: Optional[SourceType] = None,
    status: Optional[Status] = None,
) -> List[Source]:
    """获取用户的所有信息源"""
    return SourceRepository().get_multi(
        db, user_id, skip, limit, search, source_type, status
    )

def count_sources(
    db: Session, 
    user_id: str,
    search: Optional[str] = None,
    source_type: Optional[SourceType] = None,
    status: Optional[Status] = None,
) -> int:
    """计算符合条件的信息源总数"""
    return SourceRepository().count(
        db, user_id, search, source_type, status
    )

def create_source(db: Session, source_data: SourceCreate, user_id: str) -> Source:
    """创建新信息源"""
    return SourceRepository().create(db, source_data, user_id)

def update_source(db: Session, source_id: str, source_data: SourceUpdate, user_id: str) -> Optional[Source]:
    """更新现有信息源"""
    repo = SourceRepository()
    db_source = repo.get(db, id=source_id)
    
    if not db_source or db_source.user_id != user_id:
        return None
    
    return repo.update(db, db_source, source_data)

def delete_source(db: Session, source_id: str, user_id: str) -> bool:
    """删除信息源"""
    repo = SourceRepository()
    db_source = repo.get(db, id=source_id)
    
    if not db_source or db_source.user_id != user_id:
        return False
    
    return repo.remove(db, id=source_id) 