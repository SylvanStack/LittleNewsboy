from typing import List, Optional, Dict, Any
from datetime import datetime
from pydantic import BaseModel, Field


class SummaryBase(BaseModel):
    title: str
    content: str
    key_points: List[str] = []
    source_ids: List[str] = []
    tags: List[str] = []


class SummaryCreate(SummaryBase):
    pass


class SummaryUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    key_points: Optional[List[str]] = None
    source_ids: Optional[List[str]] = None
    tags: Optional[List[str]] = None
    is_archived: Optional[bool] = None
    is_important: Optional[bool] = None


class SummaryInDBBase(SummaryBase):
    id: str
    user_id: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    is_archived: bool = False
    is_important: bool = False

    class Config:
        from_attributes = True


class Summary(SummaryInDBBase):
    pass


class SummariesPage(BaseModel):
    items: List[Summary]
    total: int
    page: int
    size: int
    
    # 兼容性字段，确保API响应验证通过
    page_size: Optional[int] = None
    total_pages: Optional[int] = None

    class Config:
        from_attributes = True
        extra = "allow"  # 允许额外字段


class SummaryTemplateBase(BaseModel):
    name: str
    description: str
    parameters: Dict[str, Any] = {}


class SummaryTemplateCreate(SummaryTemplateBase):
    pass


class SummaryTemplateUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    parameters: Optional[Dict[str, Any]] = None


class SummaryTemplateInDBBase(SummaryTemplateBase):
    id: str
    user_id: str
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class SummaryTemplate(SummaryTemplateInDBBase):
    pass


class SummaryGenerateRequest(BaseModel):
    source_ids: List[str]
    template_id: Optional[str] = None
    parameters: Optional[Dict[str, Any]] = {} 