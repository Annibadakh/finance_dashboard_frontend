import React from "react";
import { NavLink } from "react-router-dom";
import {
  RiDashboardLine,
  RiExchangeDollarLine,
  RiWallet3Line,
  RiSettings4Line,
  RiLogoutBoxRLine,
  RiCloseLine,
} from "react-icons/ri";
import { FiPieChart } from "react-icons/fi";
import { triggerLogout } from "../../services/authService";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    {
      name: "Dashboard",
      icon: <RiDashboardLine size={20} />,
      path: "/dashboard",
      exact: true,
    },
    {
      name: "Transactions",
      icon: <RiExchangeDollarLine size={20} />,
      path: "/dashboard/transactions",
    },
    {
      name: "Analytics",
      icon: <FiPieChart size={20} />,
      path: "/dashboard/analytics",
    },
    {
      name: "Settings",
      icon: <RiSettings4Line size={20} />,
      path: "/settings",
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity md:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={toggleSidebar}
      ></div>

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        {/* Logo Area */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <RiWallet3Line className="text-white text-xl" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              PayFlow
            </span>
          </div>
          {/* Mobile Close Button */}
          <button
            onClick={toggleSidebar}
            className="md:hidden text-gray-500 hover:text-gray-900 dark:hover:text-white"
          >
            <RiCloseLine size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.exact}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium"
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors duration-200 font-medium">
            <RiLogoutBoxRLine size={20} />
            <span onClick={triggerLogout}>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
