from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import api_router
from app.config import settings
from app.db.session import Base, engine

# 创建数据库表
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="小报童 API",
    description="小报童(Little Newsboy)后端API服务",
    version="0.1.0",
    # 禁用尾部斜杠自动重定向
    redirect_slashes=False,
)

# 配置CORS中间件
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # 前端开发服务器原始地址
        "http://localhost:5174",  # Vite可能使用的备用端口
        "http://localhost:5175",  # Vite可能使用的另一个备用端口
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "欢迎使用小报童API服务"}

@app.get("/healthcheck")
async def healthcheck():
    return {"status": "ok"}

# 包含API路由
app.include_router(api_router, prefix=settings.API_V1_STR)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8001, reload=True) 