from typing import List, Optional, Dict, Any
from sqlalchemy.orm import Session
from sqlalchemy import desc

from app.db.models.source import Source, SourceType, UpdateFrequency, Priority, Status
from app.schemas.source import SourceCreate, SourceUpdate

def get_source_by_id(db: Session, source_id: str) -> Optional[Source]:
    """通过ID获取信息源"""
    return db.query(Source).filter(Source.id == source_id).first()

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

def count_sources(
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

def create_source(db: Session, source_data: SourceCreate, user_id: str) -> Source:
    """创建新信息源"""
    db_source = Source(
        name=source_data.name,
        type=source_data.type,
        url=source_data.url,
        update_frequency=source_data.update_frequency,
        priority=source_data.priority,
        status=source_data.status,
        filters=source_data.filters,
        credentials=source_data.credentials,
        user_id=user_id,
    )
    db.add(db_source)
    db.commit()
    db.refresh(db_source)
    return db_source

def update_source(db: Session, source_id: str, source_data: SourceUpdate, user_id: str) -> Optional[Source]:
    """更新现有信息源"""
    db_source = get_source_by_id(db, source_id)
    
    if not db_source or db_source.user_id != user_id:
        return None
    
    # 更新数据
    update_data = source_data.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_source, key, value)
    
    db.commit()
    db.refresh(db_source)
    return db_source

def delete_source(db: Session, source_id: str, user_id: str) -> bool:
    """删除信息源"""
    db_source = get_source_by_id(db, source_id)
    
    if not db_source or db_source.user_id != user_id:
        return False
    
    db.delete(db_source)
    db.commit()
    return True 