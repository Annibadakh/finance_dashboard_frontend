import React from "react";

const Loader = ({ 
  size = "md", 
  fullScreen = false, 
  text = "Loading...", 
  className = "" 
}) => {
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const SpinnerContent = () => (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <svg
        className={`animate-spin text-blue-600 dark:text-blue-500 ${sizeClasses[size]}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      {text && <span className="text-sm font-medium text-gray-500 dark:text-gray-400 animate-pulse">{text}</span>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-100 flex items-center justify-center bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm transition-opacity">
        <SpinnerContent />
      </div>
    );
  }

  return <SpinnerContent />;
};

export default Loader;