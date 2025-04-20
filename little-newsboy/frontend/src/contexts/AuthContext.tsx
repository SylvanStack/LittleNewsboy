import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

// 用户类型定义
interface User {
  id: number;
  username: string;
  email: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// 认证上下文状态
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

// 认证上下文接口
interface AuthContextType extends AuthState {
  login: (usernameOrEmail: string, password: string, rememberMe: boolean) => Promise<void>;
  register: (username: string, email: string, password: string, passwordConfirm: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

// 创建认证上下文
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 认证上下文提供者属性接口
interface AuthProviderProps {
  children: ReactNode;
}

// 认证上下文提供者组件
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true,
    error: null,
  });
  
  const navigate = useNavigate();
  
  // 初始化时检查用户认证状态
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setState(prev => ({ ...prev, loading: false }));
      return;
    }
    
    // 获取当前用户信息
    authAPI.getCurrentUser()
      .then(response => {
        setState({
          isAuthenticated: true,
          user: response.data,
          loading: false,
          error: null,
        });
      })
      .catch(() => {
        localStorage.removeItem('token');
        setState({
          isAuthenticated: false,
          user: null,
          loading: false,
          error: null,
        });
      });
  }, []);
  
  // 登录方法
  const login = async (usernameOrEmail: string, password: string, rememberMe: boolean) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const response = await authAPI.login(usernameOrEmail, password, rememberMe);
      
      // 保存令牌到本地存储
      localStorage.setItem('token', response.data.access_token);
      
      // 获取用户信息
      const userResponse = await authAPI.getCurrentUser();
      
      setState({
        isAuthenticated: true,
        user: userResponse.data,
        loading: false,
        error: null,
      });
      
      navigate('/');
    } catch (error: any) {
      setState({
        isAuthenticated: false,
        user: null,
        loading: false,
        error: error.response?.data?.detail || '登录失败，请检查您的凭据',
      });
    }
  };
  
  // 注册方法
  const register = async (username: string, email: string, password: string, passwordConfirm: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      await authAPI.register(username, email, password, passwordConfirm);
      
      // 注册成功后自动登录
      await login(username, password, false);
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error.response?.data?.detail || '注册失败，请检查您的输入',
      }));
    }
  };
  
  // 登出方法
  const logout = () => {
    localStorage.removeItem('token');
    setState({
      isAuthenticated: false,
      user: null,
      loading: false,
      error: null,
    });
    navigate('/login');
  };
  
  // 清除错误方法
  const clearError = () => {
    setState(prev => ({ ...prev, error: null }));
  };
  
  // 提供认证上下文
  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 认证上下文使用钩子
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}; 