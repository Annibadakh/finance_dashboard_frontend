import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiHome, FiArrowLeft } from "react-icons/fi";
import { RiWallet3Line } from "react-icons/ri";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 p-4 relative overflow-hidden transition-colors duration-300">
      
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-500/20 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-500/20 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-lg mx-auto">
        
        <div className="w-20 h-20 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-xl flex items-center justify-center mb-8 animate-bounce">
          <RiWallet3Line className="text-4xl text-gray-400 dark:text-gray-500" />
        </div>

        <h1 className="text-8xl font-black tracking-tighter mb-4 bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 drop-shadow-sm">
          404
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
          Page Not Found !!
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-10 text-base md:text-lg">
          The page you are looking for doesn't exist, has been moved, or you don't have access to it.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={() => navigate("/")}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold rounded-xl transition-all duration-200"
          >
            <FiArrowLeft size={18} />
            Go to Login
          </button>
          
          <Link
            to="/dashboard"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 transform transition-all active:scale-[0.98]"
          >
            <FiHome size={18} />
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;