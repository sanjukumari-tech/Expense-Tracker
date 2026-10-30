import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className = '',
  id,
  ...props
}) => {
  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-slate-300">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full px-4 py-3 bg-[#0d121f]/80 border ${
          error ? 'border-red-500 focus:ring-red-500' : 'border-slate-800 focus:ring-emerald'
        } rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 transition-all duration-300`}
        {...props}
      />
      {error && (
        <span className="text-xs text-red-500 font-medium animate-pulse-glow">
          {error}
        </span>
      )}
    </div>
  );
};
