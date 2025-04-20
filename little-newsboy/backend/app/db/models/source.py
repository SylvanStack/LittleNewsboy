from sqlalchemy import Boolean, Column, String, DateTime, JSON, ForeignKey, Enum
from sqlalchemy.sql import func
import uuid
import enum

from app.db.session import Base

class SourceType(str, enum.Enum):
    GITHUB = "github"
    ARXIV = "arxiv"
    BLOG = "blog"
    COMMUNITY = "community"
    NEWS = "news"

class UpdateFrequency(str, enum.Enum):
    REALTIME = "realtime"
    DAILY = "daily"
    WEEKLY = "weekly"

class Priority(str, enum.Enum):
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"

class Status(str, enum.Enum):
    ACTIVE = "active"
    PAUSED = "paused"

class Source(Base):
    __tablename__ = "sources"

    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, index=True)
    type = Column(Enum(SourceType), index=True)
    url = Column(String)
    update_frequency = Column(Enum(UpdateFrequency), default=UpdateFrequency.DAILY)
    priority = Column(Enum(Priority), default=Priority.MEDIUM)
    status = Column(Enum(Status), default=Status.ACTIVE)
    filters = Column(JSON, default=dict)
    credentials = Column(JSON, default=dict)
    
    user_id = Column(String, ForeignKey("users.id"))
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now()) 