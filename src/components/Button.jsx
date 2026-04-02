import React, { forwardRef } from "react";

const Button = forwardRef(({
  children,
  variant = "primary",
  size = "md",
  outline = false,
  isLoading = false,
  iconLeft: IconLeft,
  iconRight: IconRight,
  className = "",
  disabled,
  type = "button",
  ...props
}, ref) => {

  // --- Base Styles ---
  const baseClasses = "inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-950 disabled:opacity-60 disabled:pointer-events-none disabled:active:scale-100";

  // --- Size Styles ---
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-6 py-3.5 text-lg",
  };

  // --- Color Variants ---
  const variants = {
    primary: {
      solid: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 shadow-sm shadow-blue-500/20",
      outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-900/30 focus:ring-blue-500 bg-transparent",
    },
    success: {
      solid: "bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500 shadow-sm shadow-emerald-500/20",
      outline: "border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:border-emerald-500 dark:text-emerald-400 dark:hover:bg-emerald-900/30 focus:ring-emerald-500 bg-transparent",
    },
    danger: {
      solid: "bg-rose-600 hover:bg-rose-700 text-white focus:ring-rose-500 shadow-sm shadow-rose-500/20",
      outline: "border-2 border-rose-600 text-rose-600 hover:bg-rose-50 dark:border-rose-500 dark:text-rose-400 dark:hover:bg-rose-900/30 focus:ring-rose-500 bg-transparent",
    },
    warning: {
      solid: "bg-amber-500 hover:bg-amber-600 text-white focus:ring-amber-500 shadow-sm shadow-amber-500/20",
      outline: "border-2 border-amber-500 text-amber-600 hover:bg-amber-50 dark:border-amber-500 dark:text-amber-500 dark:hover:bg-amber-900/30 focus:ring-amber-500 bg-transparent",
    },
    info: {
      solid: "bg-sky-500 hover:bg-sky-600 text-white focus:ring-sky-500 shadow-sm shadow-sky-500/20",
      outline: "border-2 border-sky-500 text-sky-600 hover:bg-sky-50 dark:border-sky-500 dark:text-sky-400 dark:hover:bg-sky-900/30 focus:ring-sky-500 bg-transparent",
    },
    secondary: {
      solid: "bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white focus:ring-gray-500",
      outline: "border-2 border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 focus:ring-gray-500 bg-transparent",
    },
  };

  // Determine actual color classes based on selected variant and outline state
  const mode = outline ? "outline" : "solid";
  const colorClasses = variants[variant]?.[mode] || variants.primary.solid;

  // --- Loader SVG ---
  const Spinner = () => (
    <svg 
      className="animate-spin -ml-1 h-4 w-4" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${sizeClasses[size]} ${colorClasses} ${className}`}
      {...props}
    >
      {/* Loading Spinner or Left Icon */}
      {isLoading ? <Spinner /> : IconLeft && <IconLeft className="text-current" size={size === "sm" ? 16 : 20} />}
      
      {/* Button Text */}
      {children && <span>{children}</span>}

      {/* Right Icon */}
      {!isLoading && IconRight && <IconRight className="text-current" size={size === "sm" ? 16 : 20} />}
    </button>
  );
});

Button.displayName = "Button";
export default Button;