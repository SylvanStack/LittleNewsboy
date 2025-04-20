from datetime import timedelta
from typing import Any

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.core.security import create_access_token, get_current_active_user
from app.config import settings
from app.db.repositories.user import authenticate_user, create_user, get_user_by_email, get_user_by_username
from app.db.session import get_db
from app.schemas.user import Token, User, UserCreate, UserLogin

router = APIRouter()

@router.post("/register", response_model=User, status_code=status.HTTP_201_CREATED)
def register(*, db: Session = Depends(get_db), user_in: UserCreate) -> Any:
    """用户注册"""
    # 检查邮箱是否已被注册
    user = get_user_by_email(db, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="该邮箱已被注册",
        )
    
    # 检查用户名是否已被使用
    user = get_user_by_username(db, username=user_in.username)
    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="该用户名已被使用",
        )
    
    # 创建新用户
    user = create_user(db, user_in)
    
    return user

@router.post("/login", response_model=Token)
def login(*, db: Session = Depends(get_db), form_data: UserLogin) -> Any:
    """用户登录"""
    user = authenticate_user(db, form_data.username_or_email, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="用户名/邮箱或密码不正确",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # 根据是否勾选"记住我"设置令牌过期时间
    access_token_expires = (
        timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        if form_data.remember_me
        else timedelta(minutes=60)  # 1小时
    )
    
    # 创建访问令牌
    access_token = create_access_token(
        data={"sub": str(user.id)}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

# 用于支持OAuth2标准登录表单
@router.post("/token", response_model=Token)
def login_for_access_token(
    db: Session = Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()
) -> Any:
    """OAuth2兼容的令牌登录，主要用于Swagger文档"""
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="用户名或密码不正确",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user.id)}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=User)
def read_users_me(current_user: User = Depends(get_current_active_user)) -> Any:
    """获取当前登录用户信息"""
    return current_user 