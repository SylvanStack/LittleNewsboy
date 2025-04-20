from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="小报童 API",
    description="小报童(Little Newsboy)后端API服务",
    version="0.1.0",
)

# 配置CORS中间件
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # 前端开发服务器地址
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

# 导入和包含API路由
# 在后续开发中实现各模块的API路由

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True) 