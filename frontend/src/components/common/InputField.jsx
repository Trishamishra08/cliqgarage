import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const InputField = ({ label, error, className, ...props }) => {
  return (
    <div className={twMerge('flex flex-col gap-1.5 w-full', className)}>
      {label && (
        <label className="text-sm font-medium text-dark-600 px-1">
          {label}
        </label>
      )}
      <input
        className={twMerge(
          'px-4 py-3 bg-white border-2 border-dark-100 rounded-2xl focus:outline-none focus:border-primary-500 transition-all duration-300 placeholder:text-dark-300',
          error && 'border-red-500 focus:border-red-500'
        )}
        {...props}
      />
      {error && (
        <span className="text-xs text-red-500 px-1 font-medium">
          {error}
        </span>
      )}
    </div>
  );
};

export default InputField;
