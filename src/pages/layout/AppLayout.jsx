import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const { user } = useAuth();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans overflow-hidden transition-colors duration-300">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header
          toggleSidebar={toggleSidebar}
          toggleTheme={toggleTheme}
          isDarkMode={isDarkMode}
          user={user}
        />

        {/* Main Content Area (Outlet) */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto animate-fade-in-up">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
