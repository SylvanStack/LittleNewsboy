from typing import List, Dict, Any, Optional
import httpx
import os
import json
import asyncio
from pydantic import BaseModel

# AI提供商类型
class AIProvider:
    OPENAI = "openai"
    OLLAMA = "ollama"

# 摘要请求模型
class SummaryRequest(BaseModel):
    content: str
    max_length: int = 2000
    focus_points: List[str] = []
    format: str = "markdown"

# 摘要结果模型
class SummaryResult(BaseModel):
    summary: str
    key_points: List[str]

class AIService:
    """AI服务集成，支持OpenAI和Ollama"""
    
    def __init__(self):
        # 加载配置
        self.provider = os.getenv("AI_PROVIDER", AIProvider.OPENAI)
        self.openai_api_key = os.getenv("OPENAI_API_KEY", "")
        self.openai_model = os.getenv("OPENAI_MODEL", "gpt-3.5-turbo")
        self.ollama_url = os.getenv("OLLAMA_URL", "http://localhost:11434")
        self.ollama_model = os.getenv("OLLAMA_MODEL", "llama2")
    
    async def generate_summary(self, request: SummaryRequest) -> SummaryResult:
        """生成内容摘要"""
        if self.provider == AIProvider.OPENAI:
            return await self._generate_with_openai(request)
        else:
            return await self._generate_with_ollama(request)
    
    async def _generate_with_openai(self, request: SummaryRequest) -> SummaryResult:
        """使用OpenAI生成摘要"""
        # 构建提示词
        system_prompt = "你是一个专业的内容分析助手，擅长提取内容的核心信息并生成摘要。"
        user_prompt = f"""
        请对以下内容生成一个摘要，并列出关键要点。
        
        摘要长度要求：不超过{request.max_length}字符
        摘要格式：{request.format}
        特别关注点：{', '.join(request.focus_points) if request.focus_points else '无特别要求'}
        
        内容：
        {request.content}
        
        请按以下格式返回：
        
        ## 摘要
        <在这里生成摘要内容>
        
        ## 关键要点
        - 要点1
        - 要点2
        - ...
        """
        
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    "https://api.openai.com/v1/chat/completions",
                    headers={
                        "Authorization": f"Bearer {self.openai_api_key}",
                        "Content-Type": "application/json"
                    },
                    json={
                        "model": self.openai_model,
                        "messages": [
                            {"role": "system", "content": system_prompt},
                            {"role": "user", "content": user_prompt}
                        ],
                        "temperature": 0.3
                    },
                    timeout=60.0
                )
                
                response.raise_for_status()
                result = response.json()
                
                # 解析响应
                full_content = result["choices"][0]["message"]["content"]
                
                # 提取摘要和关键点
                summary_part = ""
                key_points = []
                
                if "## 摘要" in full_content and "## 关键要点" in full_content:
                    summary_part = full_content.split("## 摘要")[1].split("## 关键要点")[0].strip()
                    key_points_text = full_content.split("## 关键要点")[1].strip()
                    key_points = [point.strip().lstrip("- ") for point in key_points_text.split("\n") if point.strip()]
                else:
                    # 简单的后备方案
                    summary_part = full_content
                
                return SummaryResult(
                    summary=summary_part,
                    key_points=key_points
                )
                
        except Exception as e:
            # 在实际应用中，这里应该增加更好的错误处理和日志记录
            print(f"OpenAI API 调用失败: {str(e)}")
            raise
    
    async def _generate_with_ollama(self, request: SummaryRequest) -> SummaryResult:
        """使用Ollama生成摘要"""
        # 构建提示词
        prompt = f"""
        请对以下内容生成一个摘要，并列出关键要点。
        
        摘要长度要求：不超过{request.max_length}字符
        摘要格式：{request.format}
        特别关注点：{', '.join(request.focus_points) if request.focus_points else '无特别要求'}
        
        内容：
        {request.content}
        
        请按以下格式返回：
        
        ## 摘要
        <在这里生成摘要内容>
        
        ## 关键要点
        - 要点1
        - 要点2
        - ...
        """
        
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{self.ollama_url}/api/generate",
                    json={
                        "model": self.ollama_model,
                        "prompt": prompt,
                        "stream": False
                    },
                    timeout=120.0
                )
                
                response.raise_for_status()
                result = response.json()
                
                # 解析响应
                full_content = result.get("response", "")
                
                # 提取摘要和关键点
                summary_part = ""
                key_points = []
                
                if "## 摘要" in full_content and "## 关键要点" in full_content:
                    summary_part = full_content.split("## 摘要")[1].split("## 关键要点")[0].strip()
                    key_points_text = full_content.split("## 关键要点")[1].strip()
                    key_points = [point.strip().lstrip("- ") for point in key_points_text.split("\n") if point.strip()]
                else:
                    # 简单的后备方案
                    summary_part = full_content
                
                return SummaryResult(
                    summary=summary_part,
                    key_points=key_points
                )
                
        except Exception as e:
            # 在实际应用中，这里应该增加更好的错误处理和日志记录
            print(f"Ollama API 调用失败: {str(e)}")
            raise
    
    # 这里可以添加更多的AI服务功能，如摘要质量评估、内容分类等

# 创建全局AI服务实例
ai_service = AIService() 