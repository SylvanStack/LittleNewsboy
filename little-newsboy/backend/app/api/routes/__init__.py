from fastapi import APIRouter

api_router = APIRouter()

# 导入并包含子路由器
from app.api.routes.auth import router as auth_router

api_router.include_router(auth_router, prefix="/auth", tags=["auth"]) 