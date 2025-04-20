import React, { InputHTMLAttributes, ReactNode } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: ReactNode;
  fullWidth?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  helperText,
  icon,
  fullWidth = false,
  className = '',
  ...rest
}) => {
  const inputClasses = `
    px-4 py-2 border rounded-md shadow-sm 
    focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
    ${fullWidth ? 'w-full' : ''}
    ${error ? 'border-red-300 text-red-900 placeholder-red-300' : 'border-gray-300 placeholder-gray-400'}
    ${icon ? 'pl-10' : ''}
    ${className}
  `;
  
  return (
    <div className={`mb-4 ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label 
          htmlFor={rest.id} 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        
        <input
          className={inputClasses}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={rest.id && error ? `${rest.id}-error` : undefined}
          {...rest}
        />
      </div>
      
      {error && (
        <p 
          className="mt-1 text-sm text-red-600" 
          id={rest.id ? `${rest.id}-error` : undefined}
        >
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default InputField; 