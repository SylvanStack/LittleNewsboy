from fastapi import APIRouter

from app.api.routes import auth, source

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(source.router, prefix="/sources", tags=["sources"]) 