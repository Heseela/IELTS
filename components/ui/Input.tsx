import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: LucideIcon;
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon: Icon,
  fullWidth = true,
  className = '',
  ...props
}) => {
  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          className={`
            block rounded-lg border-gray-300 dark:border-gray-600
            focus:ring-primary-500 focus:border-primary-500 
            dark:bg-gray-700 dark:text-white
            ${Icon ? 'pl-10' : 'pl-3'} 
            pr-3 py-2 
            border
            ${error ? 'border-danger-500 focus:ring-danger-500 focus:border-danger-500' : ''}
            ${fullWidth ? 'w-full' : ''}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-danger-500">{error}</p>
      )}
    </div>
  );
};

export const TextArea: React.FC<{
  label?: string;
  error?: string;
  fullWidth?: boolean;
  rows?: number;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
  label,
  error,
  fullWidth = true,
  rows = 4,
  className = '',
  ...props
}) => {
  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      <textarea
        rows={rows}
        className={`
          block rounded-lg border-gray-300 dark:border-gray-600
          focus:ring-primary-500 focus:border-primary-500 
          dark:bg-gray-700 dark:text-white
          px-3 py-2 
          border
          ${error ? 'border-danger-500' : ''}
          ${fullWidth ? 'w-full' : ''}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-danger-500">{error}</p>
      )}
    </div>
  );
};