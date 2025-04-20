from fastapi import APIRouter

api_router = APIRouter()

# 导入并包含子路由器
from app.api.routes.auth import router as auth_router
from app.api.routes.source import router as source_router
from app.api.routes.summary import router as summary_router

api_router.include_router(auth_router, prefix="/auth", tags=["auth"]) 
api_router.include_router(source_router) # 已在router定义中设置了前缀和标签
api_router.include_router(summary_router, prefix="/summaries", tags=["summary"]) 