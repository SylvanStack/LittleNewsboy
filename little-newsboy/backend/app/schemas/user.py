from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, Field, validator
import re

class UserBase(BaseModel):
    email: EmailStr
    username: str = Field(..., min_length=4, max_length=20)
    
    @validator('username')
    def username_alphanumeric(cls, v):
        if not re.match(r'^[a-zA-Z0-9_]+$', v):
            raise ValueError('用户名只允许字母、数字和下划线')
        return v

class UserCreate(UserBase):
    password: str = Field(..., min_length=8, max_length=20)
    password_confirm: str
    
    @validator('password')
    def password_strength(cls, v):
        if not (
            re.search(r'[A-Z]', v) and  # 至少一个大写字母
            re.search(r'[a-z]', v) and  # 至少一个小写字母
            re.search(r'[0-9]', v) and  # 至少一个数字
            re.search(r'[^a-zA-Z0-9]', v)  # 至少一个特殊字符
        ):
            raise ValueError('密码必须包含大小写字母、数字和特殊符号')
        return v
    
    @validator('password_confirm')
    def passwords_match(cls, v, values, **kwargs):
        if 'password' in values and v != values['password']:
            raise ValueError('两次输入的密码不匹配')
        return v

class UserLogin(BaseModel):
    username_or_email: str
    password: str
    remember_me: bool = False

class UserInDB(UserBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: datetime
    
    class Config:
        orm_mode = True

class User(UserInDB):
    """返回给API的用户模型"""
    pass

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenPayload(BaseModel):
    sub: Optional[str] = None 