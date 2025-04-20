# 更新日志

## 2025年4月20日

### 会话总结
- **主要目的**：对项目历史进行了总结归纳
- **完成的主要任务**：
  - 阅读并梳理了整个项目的更新日志
  - 汇总了从2025年4月20日至2025年5月10日的所有开发进展
  - 明确了项目的技术栈和关键功能模块
  - 对项目的历史开发记录进行了完整回顾
- **关键决策和解决方案**：
  - 确认了项目使用React+TypeScript+Tailwind CSS作为前端技术栈
  - 确认了项目使用Python+FastAPI+SQLite+MinIO作为后端技术栈
  - 回顾了信息源管理、知识摘要等核心功能的实现
  - 分析了项目中的技术问题及其解决方案
- **使用的技术栈**：文档管理
- **修改的文件**：
  - `UPDATE_LOG.md`：添加新的会话总结，记录历史回顾活动

## 2025年4月21日

### 会话总结
- **主要目的**：创建市场调研报告生成的提示词模板
- **完成的主要任务**：
  - 基于已有的市场调研报告，设计了一个全面的提示词模板
  - 提示词涵盖了市场调研的六大核心部分：行业现状、市场分析、竞争分析、市场进入策略、风险评估和结论建议
  - 为每个部分提供了详细的子项目和数据要求
  - 增加了使用指南，包括占位符替换、数据来源建议、使用场景和定制化方法
  - 提供了示例输出格式，确保生成内容的质量和实用性
- **关键决策和解决方案**：
  - 采用结构化提示词设计，确保生成报告的完整性和专业性
  - 强调数据驱动的分析，要求提供具体数字和百分比
  - 兼顾不同用户群体和市场阶段的需求
- **使用的技术栈**：Markdown文档、提示词工程
- **修改的文件**：
  - `docs/提示词-市场调研生成器.md`：创建了市场调研报告生成的提示词模板
  
## 2025年4月22日

### 会话总结
- **主要目的**：优化网站设计示意图生成提示词
- **完成的主要任务**：
  - 重构了网站UI设计图生成提示词的结构和内容
  - 增加了详细的设计要求，包括设计风格、配色方案、字体选择和响应式设计规范
  - 明确了输出格式要求，确保生成的设计图包含必要的页面元素和交互逻辑
  - 规范了文件命名格式，便于管理和引用
  - 明确列出了必须包含的五个核心页面
- **关键决策和解决方案**：
  - 采用层级化结构组织提示词，使设计要求更加清晰
  - 指定了特定的配色方案，确保设计风格统一
  - 强调了现代设计标准和用户体验考量
- **使用的技术栈**：Markdown文档、UI/UX设计规范、提示词工程
- **修改的文件**：
  - `prompt/网站设计示意图.md`：优化了网站UI设计图生成提示词 

## 2025年4月23日

### 会话总结
- **主要目的**：根据需求文档和提示词创建小报童(Little Newsboy)项目的网站UI设计示意图
- **完成的主要任务**：
  - 创建了5个核心页面的详细设计示意图：首页、信息源管理、知识摘要、AI模型设置和用户注册登录
  - 为每个页面提供了清晰的ASCII艺术布局图，展示了页面元素布局和结构
  - 编写了详细的功能说明、交互逻辑和设计说明，确保开发团队理解设计意图
  - 确保所有页面设计符合现代简约风格，以蓝白为主色调
  - 设计了响应式布局考量，确保跨设备兼容性
- **关键决策和解决方案**：
  - 采用卡片式布局设计首页，确保信息分区清晰
  - 在信息源管理页面使用表格式布局，提高大量信息的可读性
  - 知识摘要页面采用单列主内容+侧边导航的结构，优化阅读体验
  - AI模型设置页面使用左侧导航+右侧配置区的布局，确保功能分类清晰
  - 登录注册页面结合产品特点展示，提高用户注册转化率
- **使用的技术栈**：UI/UX设计、ASCII艺术绘图、响应式设计规范
- **创建的文件**：
  - `2. 网站设计示意图-首页.md`：首页设计示意图
  - `2. 网站设计示意图-信息源管理.md`：信息源管理页面设计示意图
  - `2. 网站设计示意图-知识摘要.md`：知识摘要页面设计示意图
  - `2. 网站设计示意图-AI模型设置.md`：AI模型设置页面设计示意图
  - `2. 网站设计示意图-用户注册登录.md`：用户注册登录页面设计示意图 

## 2025年4月24日

### 会话总结
- **主要目的**：优化项目代码架构设计文档的提示词
- **完成的主要任务**：
  - 将简单的架构设计提示词重构为结构化、详细的指导文档
  - 明确规定了输出文件格式和命名要求
  - 详细说明了技术栈选择的考量维度
  - 制定了架构设计的基本原则
  - 为主文档和目录结构文件提供了详细的内容框架
  - 增加了注意事项部分，确保设计的实用性和适用性
- **关键决策和解决方案**：
  - 采用层级化结构组织提示词，使要求更加清晰
  - 细化了主文档应包含的七个核心部分及其子项目
  - 明确了目录结构文件的格式要求
  - 强调了设计的简洁性和可实现性
- **使用的技术栈**：Markdown文档、软件架构设计规范
- **修改的文件**：
  - `prompt/提示词-架构设计文档.md`：全面优化了架构设计文档提示词 

## 2025年4月25日

### 会话总结
- **主要目的**：根据需求文档和网站设计示意图创建项目代码架构设计文档
- **完成的主要任务**：
  - 创建了详细的项目代码架构设计文档
  - 设计了系统的分层架构，包括用户界面层、API服务层、业务逻辑层、AI处理层和数据存储层
  - 确定了技术栈选择：前端采用React+TypeScript+Tailwind CSS，后端采用Python+FastAPI
  - 设计了核心模块结构，包括信息源管理、内容处理与分析、AI集成、用户界面和通知系统
  - 制定了API设计规范和数据模型
  - 考虑了安全性设计和扩展性机制
  - 创建了详细的项目目录结构，包括前端和后端文件组织
- **关键决策和解决方案**：
  - 将系统分为前后端分离架构，便于独立开发和部署
  - 选择本地SQLite与MongoDB组合作为数据存储方案，平衡性能与易部署性
  - 设计插件式信息源连接器，确保系统可以轻松扩展支持新的信息源
  - 采用Docker容器化部署策略，简化安装和环境一致性
  - 将AI处理设计为独立模块，支持灵活切换本地Ollama和云端OpenAI服务
- **使用的技术栈**：React、TypeScript、Tailwind CSS、FastAPI、SQLite、MongoDB、Langchain、Docker
- **创建的文件**：
  - `3. 项目代码架构设计文档.md`：详细的架构设计文档
  - `3. 网站目录结构.txt`：项目文件和目录组织结构 

## 2025年4月26日

### 会话总结
- **主要目的**：将系统架构中的MongoDB替换为MinIO对象存储
- **完成的主要任务**：
  - 修改项目代码架构设计文档，将MongoDB替换为MinIO作为主要存储方案
  - 更新系统架构图和数据流说明，适应对象存储架构
  - 调整数据存储策略，使用SQLite存储元数据，MinIO存储实际内容和向量数据
  - 在代码目录结构中增加storage模块，负责MinIO客户端和对象存储抽象
  - 添加MinIO相关的环境变量配置说明
- **关键决策和解决方案**：
  - 采用MinIO作为兼容S3 API的对象存储，提供更好的文件存储能力
  - 将数据流程重新设计为：元数据存入SQLite，内容和向量数据存入MinIO
  - 设计了对象存储抽象层，便于未来扩展到其他存储服务
  - 通过确保存储模块与业务逻辑分离，保持代码可维护性
  - 保留了向量数据库功能，但可选择将向量直接存储在MinIO中
- **使用的技术栈**：MinIO、SQLite、FastAPI、S3兼容API
- **修改的文件**：
  - `docs/3. 项目代码架构设计文档.md`：替换MongoDB为MinIO，调整存储架构
  - `docs/3. 代码目录结构.txt`：增加storage模块和MinIO相关配置 

## 2025年4月27日

### 会话总结
- **主要目的**：根据设计文档进行项目搭建和首页功能开发
- **完成的主要任务**：
  - 创建了前端项目结构，使用React、TypeScript和Tailwind CSS
  - 实现了前端基础布局组件（Header、Footer）
  - 开发了首页UI，包含欢迎区、信息源概览、热门话题、项目健康度和最新报告等模块
  - 创建了路由系统和页面骨架（SourceManagement、KnowledgeSummary、AISettings等）
  - 实现了用户认证页面（登录、注册）
  - 搭建了后端基础框架，使用FastAPI、SQLite和MinIO
  - 创建了基本的数据模型（用户、信息源）
  - 配置了Docker和Docker Compose环境
- **关键决策和解决方案**：
  - 采用前后端分离架构，便于独立开发和部署
  - 使用Tailwind CSS快速构建符合设计规范的UI
  - 实现了组件的懒加载，提高应用性能
  - 采用卡片式布局设计首页，确保信息分区清晰
  - 配置使用国内镜像源，提高安装依赖速度
- **使用的技术栈**：
  - 前端：React、TypeScript、Tailwind CSS、React Router、Recharts
  - 后端：Python、FastAPI、SQLite、MinIO
  - 部署：Docker、Docker Compose
- **创建和修改的文件**：
  - 前端结构：建立了组件、页面和样式系统
  - 后端架构：创建了API、数据模型和存储系统
  - 配置文件：添加了Docker、环境变量和依赖配置
  - 文档：更新了项目README 

## 2025年4月28日

### 会话总结
- **主要目的**：优化首页，添加"正在追踪的信息源"组件
- **完成的主要任务**：
  - 创建了新的InfoSources组件，用于展示用户正在追踪的信息源
  - 修改首页布局，添加了正在追踪的信息源模块
  - 优化了UI设计和用户体验
  - 模拟了信息源数据，包括GitHub项目、技术博客、学术论文和社区讨论
  - 实现了信息源类型图标和更新状态显示
- **关键决策和解决方案**：
  - 使用卡片式布局展示信息源，提高可读性
  - 为不同类型的信息源使用不同图标，增强视觉区分度
  - 添加更新状态标记，突出显示有新内容的信息源
  - 保留信息源统计卡片，同时增加信息源详情展示
- **使用的技术栈**：
  - React、TypeScript、Tailwind CSS、HeroIcons
- **修改的文件**：
  - `little-newsboy/frontend/src/pages/Home/InfoSources.tsx`：创建了新的信息源组件
  - `little-newsboy/frontend/src/pages/Home/index.tsx`：更新首页布局，集成信息源组件 

## 2025年4月29日

### 会话总结
- **主要目的**：优化用户注册与登录模块的开发指南
- **完成的主要任务**：
  - 将简单的提示词重构为结构化、详细的开发指南文档
  - 明确定义了用户注册与登录功能的具体需求
  - 添加了安全性要求和详细的界面设计规范
  - 提供了明确的技术实现路径和推荐工具
  - 增加了开发注意事项和可选高级功能部分
- **关键决策和解决方案**：
  - 采用分层结构组织文档，使开发要求更加清晰
  - 详细说明了表单字段要求和验证规则
  - 强调了安全性设计，包括密码加密、防暴力破解等措施
  - 明确指定了前后端技术栈和第三方库的选择
  - 保留了使用国内镜像源的要求，确保依赖安装顺利
- **使用的技术栈**：
  - 前端：React、TypeScript、Tailwind CSS、Formik/React Hook Form
  - 后端：FastAPI、SQLite、JWT/Session认证
- **修改的文件**：
  - `提示词-用户注册登陆.md`：全面优化为详细的开发指南

## 2025年4月30日

### 会话总结
- **主要目的**：开发信息源管理功能
- **完成的主要任务**：
  - 实现了后端信息源管理API，包括创建、读取、更新和删除功能
  - 开发了信息源数据库模型、存储库和Pydantic验证模式
  - 创建了前端信息源管理页面，支持列表显示、分页、搜索和筛选
  - 实现了信息源添加、编辑和删除功能的模态框
  - 增加了信息源刷新功能
  - 开发了多个可复用UI组件，如Modal、Button、Table、Pagination等
- **关键决策和解决方案**：
  - 设计了完整的前后端数据流，确保信息源管理的稳定性和可靠性
  - 采用了模块化和组件化设计，提高代码可复用性
  - 使用表格式布局展示信息源列表，配合分页提高大量数据的可读性
  - 实现了信息源类型、状态和优先级的分类标签，增强视觉体验
  - 添加了字段验证和错误处理，提高用户体验
- **使用的技术栈**：
  - 前端：React、TypeScript、Tailwind CSS、React Hooks
  - 后端：Python、FastAPI、SQLAlchemy、Pydantic
- **创建和修改的文件**：
  - 后端：
    - `little-newsboy/backend/app/db/repositories/source.py`：信息源存储库实现
    - `little-newsboy/backend/app/schemas/source.py`：信息源Pydantic模型
    - `little-newsboy/backend/app/api/routes/source.py`：信息源API路由
    - `little-newsboy/backend/app/api/routes/__init__.py`：更新路由注册
  - 前端：
    - `little-newsboy/frontend/src/services/api.ts`：添加信息源API调用
    - `little-newsboy/frontend/src/components/ui/Modal.tsx`：模态框组件
    - `little-newsboy/frontend/src/components/ui/Button.tsx`：按钮组件
    - `little-newsboy/frontend/src/components/ui/Table.tsx`：表格组件
    - `little-newsboy/frontend/src/components/ui/Pagination.tsx`：分页组件
    - `little-newsboy/frontend/src/components/ui/InputField.tsx`：输入字段组件
    - `little-newsboy/frontend/src/components/ui/SelectField.tsx`：选择字段组件
    - `little-newsboy/frontend/src/pages/SourceManagement/index.tsx`：信息源管理页面
    - `little-newsboy/frontend/src/pages/SourceManagement/SourceForm.tsx`：信息源表单组件 

## 2025年5月1日

### 会话总结
- **主要目的**：改进信息源管理功能
- **完成的主要任务**：
  - 在信息源管理页面添加了信息源刷新功能
  - 重新组织了后端API路由结构，优化了API的URL设计
  - 统一了错误处理和响应格式
  - 确保信息源操作的安全性，验证用户权限
- **关键决策和解决方案**：
  - 在前端添加刷新按钮，允许用户手动更新信息源数据
  - 优化路由注册方式，使用统一的前缀和标签配置
  - 使用HTTP 202状态码表示刷新请求已接受但处理异步进行
  - 对所有API进行用户身份验证，确保信息源操作的安全性
- **使用的技术栈**：
  - 前端：React、TypeScript、Ant Design
  - 后端：Python、FastAPI、SQLAlchemy、Pydantic
- **修改的文件**：
  - `little-newsboy/frontend/src/pages/SourceManagement/index.tsx`：添加刷新功能
  - `little-newsboy/backend/app/api/routes/source.py`：优化路由结构和处理逻辑
  - `little-newsboy/backend/app/api/routes/__init__.py`：更新路由注册方式 

## 2025年5月2日

### 会话总结
- **主要目的**：修复项目启动问题和前端依赖缺失错误
- **完成的主要任务**：
  - 解决了前端依赖缺失问题，安装了Ant Design和图标库
  - 修复了backend目录结构中缺少的模块和文件
  - 解决了源码管理API路径不一致问题
  - 创建了缺失的API依赖文件和认证模块
  - 统一了前后端调用接口
- **关键决策和解决方案**：
  - 安装antd和@ant-design/icons依赖
  - 创建api.deps和token.py模块，支持认证功能
  - 统一API路径从/sources改为/source，确保前后端一致
  - 重构代码，使用sourceAPI服务而非直接API调用
  - 减少了重复的授权头设置代码
- **使用的技术栈**：
  - 前端：React、TypeScript、Ant Design、Axios
  - 后端：Python、FastAPI、SQLAlchemy、JWT认证
- **修改的文件**：
  - `little-newsboy/backend/app/api/deps.py`：创建API依赖文件
  - `little-newsboy/backend/app/schemas/token.py`：创建Token模式
  - `little-newsboy/backend/app/core/config.py`：创建配置引用
  - `little-newsboy/frontend/src/services/api.ts`：修复API路径
  - `little-newsboy/frontend/src/pages/SourceManagement/index.tsx`：重构API调用 

## 2025年5月3日

### 会话总结
- **主要目的**：修复API响应验证错误
- **完成的主要任务**：
  - 修复了后端API响应模型与实际返回数据不匹配的问题
  - 调整了SourcesPage模型结构，增强了兼容性
  - 添加了额外的兼容字段，确保API响应验证通过
  - 解决了前端访问信息源列表时的500内部错误
- **关键决策和解决方案**：
  - 在SourcesPage模型中添加了`extra = "allow"`配置，允许额外字段
  - 在API响应中额外添加了`page_size`和`total_pages`字段，确保兼容性
  - 保留了原有的`size`字段，实现了向前兼容
- **使用的技术栈**：
  - Python、FastAPI、Pydantic
- **修改的文件**：
  - `little-newsboy/backend/app/schemas/source.py`：修改SourcesPage模型
  - `little-newsboy/backend/app/api/routes/source.py`：调整API响应结构 

## 2025年5月4日

### 会话总结
- **主要目的**：解决持续出现的422验证错误和API重定向问题
- **完成的主要任务**：
  - 完全解决了前端访问信息源列表的422验证错误
  - 修复了URL尾部斜杠导致的307重定向问题
  - 增强了Source和SourcesPage模型的兼容性
  - 添加了API参数处理，确保前后端参数名称一致
  - 提供了多个API路由路径，支持带斜杠和不带斜杠的URL
  - 修正了前后端的枚举值不匹配问题
- **关键决策和解决方案**：
  - 在SourcesPage模型中添加了可选字段，确保与API响应完全匹配
  - 在FastAPI应用中关闭了尾部斜杠自动重定向功能
  - 添加了额外的路由处理函数，同时支持多种URL格式
  - 修正了前端API服务中的参数名称，与后端保持一致
  - 统一了前后端的枚举值，使用小写值(如github, active)替代大写值(如GITHUB, ACTIVE)
- **使用的技术栈**：
  - 后端：Python、FastAPI、Pydantic、SQLAlchemy
  - 前端：TypeScript、React、Axios、Ant Design
- **修改的文件**：
  - `little-newsboy/backend/app/schemas/source.py`：完善Pydantic模型兼容性
  - `little-newsboy/backend/app/main.py`：禁用尾部斜杠自动重定向
  - `little-newsboy/backend/app/api/routes/source.py`：添加多个API路由路径
  - `little-newsboy/frontend/src/services/api.ts`：修正API参数名称
  - `little-newsboy/frontend/src/types/source.ts`：修正枚举值为小写
  - `little-newsboy/frontend/src/pages/SourceManagement/index.tsx`：更新映射对象 

## 2025年5月5日

### 会话总结
- **主要目的**：解决端口冲突问题并重启服务
- **完成的主要任务**：
  - 解决了8000端口被占用的问题
  - 将后端API服务迁移到8001端口
  - 更新了前端API调用配置，指向新端口
  - 扩展了CORS配置，支持多个前端端口
  - 成功重启了前后端服务
- **关键决策和解决方案**：
  - 避免强制终止已运行的进程，选择使用新端口
  - 在两个地方更新API URL配置（services/api.ts和api.ts）
  - 保持API路径和结构不变，仅更改端口号
  - 添加了对多个可能的前端端口的CORS支持
- **使用的技术栈**：
  - 后端：Python、FastAPI、Uvicorn
  - 前端：React、Vite、Axios
- **修改的文件**：
  - `little-newsboy/frontend/src/services/api.ts`：更新API_URL
  - `little-newsboy/frontend/src/api.ts`：更新baseURL
  - `little-newsboy/backend/app/main.py`：更新CORS配置和默认端口 

## 2025年5月6日

### 会话总结
- **主要目的**：重新启动项目服务
- **完成的主要任务**：
  - 成功启动后端API服务，监听8001端口
  - 成功启动前端开发服务器，监听5173端口
  - 验证两个服务的可访问性和正常运行状态
- **关键决策和解决方案**：
  - 使用uvicorn命令启动后端服务，并启用热重载功能
  - 使用npm run dev启动前端开发服务器
  - 通过curl命令和HTTP状态码检查服务健康状态
- **使用的技术栈**：
  - 后端：Python、FastAPI、Uvicorn
  - 前端：React、Vite、npm
  - 系统工具：curl、lsof
- **服务访问地址**：
  - 后端API：http://localhost:8001
  - API文档：http://localhost:8001/docs
  - 前端应用：http://localhost:5173

## 2024年6月17日

### 会话目的
确认并关闭项目的后端和前端服务，确保所有服务正常停止运行。

### 完成的主要任务
- 检查后端服务(端口8001)状态，确认已停止运行
- 检查前端服务(端口5173)状态，确认已停止运行
- 验证系统无残留运行进程

### 关键决策和解决方案
- 使用不同的进程检查方法确认服务状态：
  - 检查特定端口的监听状态
  - 搜索相关Python和Node.js进程
  - 验证端口可用性

### 使用的技术栈
- 系统管理工具：ps, grep, lsof, nc
- 操作系统：macOS

### 修改了哪些文件
- UPDATE_LOG.md (更新会话日志) 

## 2025年4月28日

### 会话总结
- **主要目的**：优化知识摘要功能开发的提示词文案
- **完成的主要任务**：
  - 将简单的功能请求重构为详细的开发需求文档
  - 细化了知识摘要功能的前端和后端需求
  - 明确定义了核心界面：摘要列表、详情页面、生成界面和管理功能
  - 详细规划了API端点和数据模型设计
  - 提供了AI集成和性能优化的具体要求
  - 补充了可选的扩展功能建议
- **关键决策和解决方案**：
  - 采用卡片式布局设计知识摘要列表页面
  - 规划了异步处理机制，避免长时间阻塞用户操作
  - 设计了摘要模板系统，提高摘要生成质量
  - 提出了缓存机制和数据清理策略，优化性能
- **使用的技术栈**：React、TypeScript、TailwindCSS、FastAPI、SQLAlchemy、OpenAI/Ollama
- **修改的文件**：
  - `prompt/提示词-知识摘要功能开发.md`：完全重构了知识摘要功能的开发需求 

## 2025年5月10日

### 会话总结
- **主要目的**：实现知识摘要功能模块的开发
- **完成的主要任务**：
  - 实现了后端知识摘要功能，包括数据模型、存储库和API路由
  - 创建了摘要生成的AI服务集成，支持OpenAI和Ollama两种模型
  - 开发了前端摘要列表页面、摘要卡片组件和摘要详情页面
  - 实现了摘要生成、编辑、删除、归档等核心功能
  - 添加了标签管理和筛选系统
  - 添加了前端所需的类型定义和API服务
- **关键决策和解决方案**：
  - 采用卡片式布局展示摘要列表，提高信息可读性
  - 实现异步生成摘要机制，避免长时间阻塞用户操作
  - 使用ReactMarkdown渲染摘要内容，支持丰富的格式化显示
  - 为摘要添加标签系统，便于管理和筛选
  - 实现多种筛选和排序功能，优化用户体验
- **使用的技术栈**：
  - 前端：React、TypeScript、Ant Design、TailwindCSS、React Router、ReactMarkdown
  - 后端：FastAPI、SQLAlchemy、Pydantic、httpx
  - AI服务：OpenAI API与Ollama本地模型集成
- **修改的文件**：
  - 后端：
    - `app/db/models/summary.py`：摘要和摘要模板数据模型
    - `app/db/models/__init__.py`：更新模型导入
    - `app/schemas/summary.py`：摘要相关的Pydantic模型
    - `app/db/repositories/summary.py`：摘要和模板的存储库
    - `app/services/ai.py`：AI服务集成
    - `app/api/routes/summary.py`：摘要API路由
    - `app/api/routes/__init__.py`：更新API路由注册
  - 前端：
    - `src/types/summary.ts`：摘要相关的TypeScript类型定义
    - `src/services/api.ts`：添加摘要API服务
    - `src/pages/KnowledgeSummary/index.tsx`：摘要列表页面
    - `src/pages/KnowledgeSummary/SummaryCard.tsx`：摘要卡片组件
    - `src/pages/KnowledgeSummary/GenerateSummaryModal.tsx`：摘要生成模态框
    - `src/pages/KnowledgeSummary/SummaryDetail.tsx`：摘要详情页面
    - `src/App.tsx`：更新路由配置
    - `package.json`：添加新依赖
    - `install-dependencies.sh`：使用国内镜像源安装依赖的脚本 

## 2024-11-01

### 会话目的
启动小报童项目的前端和后端服务

### 完成的主要任务
- 使用国内镜像源安装项目依赖
- 修复了后端代码中的类缺失问题（添加 SourceRepository 类）
- 更新了 Pydantic 模型的配置，适配新版本
- 启动了后端服务（http://localhost:8001）
- 启动了前端服务（http://localhost:5173）

### 关键决策和解决方案
- 创建了 SourceRepository 类以解决导入错误
- 将 orm_mode 更改为 from_attributes 以适配 Pydantic V2
- 将 allow_population_by_field_name 更改为 populate_by_name 以适配 Pydantic V2
- 使用 start.sh 脚本分别启动前端和后端服务

### 使用的技术栈
- 后端：Python, FastAPI, SQLAlchemy, Pydantic
- 前端：React, TypeScript, Vite, Tailwind CSS

### 修改的文件
- little-newsboy/backend/app/db/repositories/source.py
- little-newsboy/backend/app/schemas/source.py 