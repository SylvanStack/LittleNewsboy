# 小报童 (Little Newsboy)

小报童是一个专注于解决信息爆炸时代知识追踪与分析的平台，尤其针对AI技术领域的快速迭代。其核心目标是帮助技术研发人员、产品经理、研究人员和投资分析师高效地追踪、过滤和理解分散的知识源。

## 项目结构

```
little-newsboy/             # 项目根目录
├── frontend/               # 前端应用 (React + TypeScript + Tailwind CSS)
├── backend/                # 后端应用 (Python + FastAPI + SQLite + MinIO)
├── docker-compose.yml      # Docker配置
└── .env                    # 环境变量配置
```

## 技术栈

### 前端
- React + TypeScript
- Tailwind CSS 用于UI设计
- React Router 用于路由管理
- Recharts 用于数据可视化

### 后端
- Python + FastAPI
- SQLite 用于关系型数据存储
- MinIO 用于对象存储
- Langchain 用于AI模型集成
- Celery 用于异步任务处理

## 快速开始

### 开发环境设置

1. 克隆项目

```bash
git clone <repository-url>
cd little-newsboy
```

2. 使用Docker Compose启动开发环境

```bash
docker compose up -d
```

这将启动以下服务：
- 前端开发服务器（http://localhost:5173）
- 后端API服务器（http://localhost:8000）
- MinIO对象存储服务（http://localhost:9000，控制台：http://localhost:9001）
- Redis服务（用于Celery任务队列）
- Celery工作进程

### 本地开发

如果不使用Docker，可以按以下步骤设置本地开发环境：

#### 前端

```bash
cd frontend
npm install
npm run dev
```

前端开发服务器将在 http://localhost:5173 上运行。

#### 后端

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

后端API服务将在 http://localhost:8000 上运行。可以访问 http://localhost:8000/docs 查看API文档。

## 功能概述

- 信息源管理：支持多种信息源（GitHub、论文平台、技术博客、社区讨论等）
- 内容检索与过滤：基于关键词、时间范围和相关性进行内容筛选
- 知识整理与摘要：自动生成内容摘要、提取关键观点、识别趋势
- AI技术集成：支持本地Ollama和云端OpenAI服务，实现内容分析和生成
- 项目健康度评估：分析开源项目活跃度、贡献者情况和发展趋势

## 贡献指南

项目处于开发阶段，欢迎贡献！请参阅 `CONTRIBUTING.md` 了解更多信息。

## 许可证

[MIT License](LICENSE) 