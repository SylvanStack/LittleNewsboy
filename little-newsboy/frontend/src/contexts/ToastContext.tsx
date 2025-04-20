import { createContext, useContext, useState, ReactNode } from 'react'
import { ToastContainer } from '../components/ui/Toast'
import { v4 as uuidv4 } from 'uuid'

// Toast类型
type ToastType = 'success' | 'error' | 'info' | 'warning';

// Context中Toast项
interface ContextToastItem {
  id: string;
  type: ToastType;
  message: string;
  description?: string;
  duration?: number;
}

// Toast上下文接口
interface ToastContextProps {
  toasts: ContextToastItem[];
  showToast: (type: ToastType, message: string, description?: string, duration?: number) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

// 创建上下文
const ToastContext = createContext<ToastContextProps | undefined>(undefined);

// Toast提供者组件
export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ContextToastItem[]>([]);

  // 显示Toast
  const showToast = (
    type: ToastType,
    message: string,
    description?: string,
    duration: number = 5000
  ) => {
    const id = uuidv4();
    const newToast: ContextToastItem = {
      id,
      type,
      message,
      description,
      duration
    };
    
    // 添加新的toast到数组
    setToasts(prev => [...prev, newToast]);
  };

  // 移除单个Toast
  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // 清除所有Toast
  const clearToasts = () => {
    setToasts([]);
  };

  // 定义一些便捷方法
  const contextValue: ToastContextProps = {
    toasts,
    showToast,
    removeToast,
    clearToasts
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer 
        toasts={toasts.map(toast => ({
          id: toast.id,
          type: toast.type,
          message: toast.message,
          description: toast.description,
          duration: toast.duration,
          onClose: () => removeToast(toast.id)
        }))} 
        removeToast={removeToast} 
      />
    </ToastContext.Provider>
  );
};

// 创建自定义钩子
export const useToast = () => {
  const context = useContext(ToastContext);
  
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  
  return {
    ...context,
    success: (message: string, description?: string, duration?: number) => 
      context.showToast('success', message, description, duration),
    error: (message: string, description?: string, duration?: number) => 
      context.showToast('error', message, description, duration),
    warning: (message: string, description?: string, duration?: number) => 
      context.showToast('warning', message, description, duration),
    info: (message: string, description?: string, duration?: number) => 
      context.showToast('info', message, description, duration)
  };
}; 