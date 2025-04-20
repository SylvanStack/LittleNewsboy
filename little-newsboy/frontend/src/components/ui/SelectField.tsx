import React, { SelectHTMLAttributes } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  placeholderText?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  error,
  helperText,
  fullWidth = false,
  className = '',
  placeholderText,
  ...rest
}) => {
  const selectClasses = `
    block px-4 py-2 border rounded-md shadow-sm 
    focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
    ${fullWidth ? 'w-full' : ''}
    ${error ? 'border-red-300 text-red-900' : 'border-gray-300 text-gray-700'}
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
      
      <select
        className={selectClasses}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={rest.id && error ? `${rest.id}-error` : undefined}
        {...rest}
      >
        {placeholderText && (
          <option value="" disabled>
            {placeholderText}
          </option>
        )}
        
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
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

export default SelectField; 