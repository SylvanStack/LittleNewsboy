from sqlalchemy import Column, String, Integer, DateTime, Boolean, JSON, ForeignKey, Table, ARRAY
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import uuid

from app.db.session import Base

# 定义摘要与源之间的多对多关系
summary_source_association = Table(
    'summary_source_association',
    Base.metadata,
    Column('summary_id', String, ForeignKey('summaries.id')),
    Column('source_id', String, ForeignKey('sources.id'))
)

class Summary(Base):
    __tablename__ = "summaries"

    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    title = Column(String, index=True)
    content = Column(String)
    key_points = Column(JSON, default=list)  # 存储为JSON数组
    tags = Column(JSON, default=list)  # 存储为JSON数组
    is_archived = Column(Boolean, default=False)
    is_important = Column(Boolean, default=False)
    
    # 关联用户
    user_id = Column(String, ForeignKey("users.id"))
    user = relationship("User", backref="summaries")
    
    # 关联信息源（多对多）
    sources = relationship("Source", secondary=summary_source_association, backref="summaries")
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class SummaryTemplate(Base):
    __tablename__ = "summary_templates"

    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, index=True)
    description = Column(String)
    parameters = Column(JSON, default=dict)  # 存储模板参数
    
    # 关联用户
    user_id = Column(String, ForeignKey("users.id"))
    user = relationship("User", backref="summary_templates")
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now()) 