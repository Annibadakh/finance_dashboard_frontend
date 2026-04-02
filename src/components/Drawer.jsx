import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

const Drawer = ({ children, onClose, title }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Trigger opening animation immediately after mount
    setIsOpen(true);
    // Prevent background scrolling
    document.body.style.overflow = "hidden";
    
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Handle closing with exit animation
  const handleClose = () => {
    setIsOpen(false);
    // Wait for the slide-out transition to finish before triggering the route change
    setTimeout(() => {
      if (onClose) onClose();
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      {/* Sliding Panel */}
      <div
        className={`absolute inset-y-0 right-0 w-full max-w-md md:max-w-lg bg-gray-50 dark:bg-gray-950 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col border-l border-gray-200 dark:border-gray-800 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 z-10">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors focus:outline-none"
          >
            <FiX size={22} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-white dark:bg-gray-900">
          {/* We clone the children to pass the handleClose function to them, 
              so buttons inside the form can trigger the smooth exit animation */}
          {React.Children.map(children, child =>
            React.cloneElement(child, { closeDrawer: handleClose })
          )}
        </div>
      </div>
    </div>
  );
};

export default Drawer;