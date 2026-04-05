import { BiUserCircle } from "react-icons/bi";
import { FiMenu, FiBell, FiSearch, FiMoon, FiSun } from "react-icons/fi";

const Header = ({ toggleSidebar, toggleTheme, isDarkMode, user }) => {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-20 px-4 md:px-8 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 -ml-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden text-gray-600 dark:text-gray-300 transition-colors"
        >
          <FiMenu size={24} />
        </button>

        <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-900 rounded-full px-4 py-2 border border-transparent focus-within:border-blue-500 dark:focus-within:border-blue-500 transition-colors">
          <FiSearch className="text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search transactions..."
            className="bg-transparent border-none outline-none pl-3 text-sm text-gray-700 dark:text-gray-200 w-64 placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-5">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400 transition-all duration-300"
        >
          {isDarkMode ? (
            <FiSun size={20} className="hover:animate-spin-slow" />
          ) : (
            <FiMoon size={20} className="hover:animate-pulse" />
          )}
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-2 md:pl-4 md:border-l border-gray-200 dark:border-gray-800 cursor-pointer">
          <span className="text-indigo-600">
            <BiUserCircle size={35} />
          </span>
          <div className="hidden md:block">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              {user.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {user.email}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
