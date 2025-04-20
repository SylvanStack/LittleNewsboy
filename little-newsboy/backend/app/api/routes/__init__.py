from fastapi import APIRouter

from app.api.routes import auth, sources, summary, analytics

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(sources.router, prefix="/sources", tags=["sources"])
api_router.include_router(summary.router, prefix="/summaries", tags=["summary"])
api_router.include_router(analytics.router, prefix="/analytics", tags=["analytics"]) 