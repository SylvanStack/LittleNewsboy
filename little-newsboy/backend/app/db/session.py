from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from app.config import settings

# 创建SQLAlchemy引擎
engine = create_engine(
    settings.DATABASE_URL, connect_args={"check_same_thread": False}
)

# 创建数据库会话工厂
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 创建Base类，用于创建模型类
Base = declarative_base()

# 数据库依赖项，用于FastAPI端点
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close() 