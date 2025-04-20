from datetime import datetime
from typing import Optional, Dict, Any, List
from pydantic import BaseModel, Field, HttpUrl, validator

from app.db.models.source import SourceType, UpdateFrequency, Priority, Status

# 共享属性基类
class SourceBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    type: SourceType
    url: str = Field(..., min_length=5)
    update_frequency: UpdateFrequency = UpdateFrequency.DAILY
    priority: Priority = Priority.MEDIUM
    status: Status = Status.ACTIVE
    filters: Dict[str, Any] = Field(default_factory=dict)
    credentials: Dict[str, Any] = Field(default_factory=dict)
    
    # URL验证器
    @validator('url')
    def validate_url(cls, v):
        if not v.startswith(('http://', 'https://')):
            raise ValueError('URL必须以http://或https://开头')
        return v

# 创建信息源时使用
class SourceCreate(SourceBase):
    pass

# 更新信息源时使用，所有字段都是可选的
class SourceUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    type: Optional[SourceType] = None
    url: Optional[str] = Field(None, min_length=5)
    update_frequency: Optional[UpdateFrequency] = None
    priority: Optional[Priority] = None
    status: Optional[Status] = None
    filters: Optional[Dict[str, Any]] = None
    credentials: Optional[Dict[str, Any]] = None
    
    # URL验证器
    @validator('url')
    def validate_url(cls, v):
        if v is not None and not v.startswith(('http://', 'https://')):
            raise ValueError('URL必须以http://或https://开头')
        return v

# 返回信息源信息时使用
class Source(SourceBase):
    id: str
    user_id: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

# 用于分页响应
class SourcesPage(BaseModel):
    items: List[Source]
    total: int
    page: int
    size: int
    page_size: Optional[int] = None
    total_pages: Optional[int] = None
    
    class Config:
        from_attributes = True
        # 允许额外字段
        extra = "allow"
        # 允许字段别名
        populate_by_name = True 