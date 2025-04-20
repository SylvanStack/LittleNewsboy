import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  fullWidth?: boolean;
  isLoading?: boolean;
  icon?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  isLoading = false,
  icon,
  className = '',
  disabled,
  ...rest
}) => {
  // 变体样式映射
  const variantStyles = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500',
    success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    warning: 'bg-yellow-600 hover:bg-yellow-700 text-white focus:ring-yellow-500',
    info: 'bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500',
    outline: 'bg-transparent hover:bg-gray-100 text-blue-600 border border-blue-600 focus:ring-blue-500',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-600 focus:ring-gray-500',
  };

  // 尺寸样式映射
  const sizeStyles = {
    sm: 'px-2.5 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  // 宽度样式
  const widthStyle = fullWidth ? 'w-full' : '';

  // 加载状态
  const loadingState = isLoading ? 'opacity-80 pointer-events-none' : '';

  // 禁用状态
  const disabledState = disabled ? 'opacity-60 cursor-not-allowed' : '';
  
  return (
    <button
      className={`
        rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2
        transition-colors duration-200 ease-in-out flex items-center justify-center
        min-w-[80px] p-2
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${widthStyle}
        ${loadingState}
        ${disabledState}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {icon && !isLoading && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button; 