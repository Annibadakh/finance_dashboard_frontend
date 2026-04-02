import React, { forwardRef } from "react";

const LabelInput = forwardRef(({ 
  label, 
  error, 
  icon: Icon, 
  type = "text", 
  className = "", 
  ...props 
}, ref) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className={`text-gray-400 ${error ? 'text-red-400' : ''}`} size={18} />
          </div>
        )}
        <input
          ref={ref}
          type={type}
          className={`w-full py-2.5 bg-gray-50 dark:bg-gray-950 border rounded-xl text-gray-900 dark:text-white outline-none transition-all focus:ring-2 
            ${Icon ? 'pl-10' : 'pl-4'} pr-4 
            ${error 
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
              : 'border-gray-200 dark:border-gray-800 focus:ring-blue-500 focus:border-blue-500'
            }`}
          {...props}
        />
      </div>
      {error && <p className="mt-1.5 text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
});

LabelInput.displayName = "LabelInput";
export default LabelInput;