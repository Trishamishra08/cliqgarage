import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Button = ({ children, variant = 'primary', className, ...props }) => {
  const baseStyles = 'px-6 py-3 font-semibold rounded-2xl transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-primary-600 text-white shadow-lg shadow-primary-200 hover:bg-primary-700',
    secondary: 'bg-white text-dark-800 border-2 border-dark-100 hover:border-primary-500 hover:text-primary-600',
    outline: 'border-2 border-primary-500 text-primary-600 hover:bg-primary-50',
    ghost: 'text-dark-600 hover:bg-dark-50',
  };

  return (
    <button 
      className={twMerge(baseStyles, variants[variant], className)} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
