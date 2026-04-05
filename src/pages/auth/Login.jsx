import { useState } from "react";
import { FiMail, FiLock, FiEye, FiEyeOff, FiMoon, FiSun } from "react-icons/fi";
import { RiWallet3Line } from "react-icons/ri";

import { useLogin } from "./useLogin";
import { useTheme } from "../../context/ThemeContext";

import LabelInput from "../../components/LabelInput";
import Button from "../../components/Button";
import { BiLogIn } from "react-icons/bi";

const Login = () => {
  const { formData, errors, isLoading, handleChange, handleSubmit } =
    useLogin();
  const { isDarkMode, toggleTheme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 transition-colors duration-300 relative overflow-hidden">
      <button
        onClick={toggleTheme}
        className="absolute bottom-6 right-6 p-3 rounded-full bg-blue-600 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-white dark:text-gray-500 hover:shadow-md transition-all z-10"
      >
        {isDarkMode ? <FiSun size={22} /> : <FiMoon size={22} />}
      </button>

      <div className="w-full max-w-md p-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/20 dark:border-gray-800 rounded-3xl shadow-2xl z-10 mx-4">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-linear-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
            <RiWallet3Line className="text-white text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome to PayFlow
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Sign in to manage your finances
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <LabelInput
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="admin@payflow.com"
            icon={FiMail}
            error={errors.email}
          />

          <div className="relative">
            <LabelInput
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              icon={FiLock}
              error={errors.password}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-9.5 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>

          <Button
            iconLeft={BiLogIn}
            type="submit"
            className="w-full mt-4"
            isLoading={isLoading}
          >
            Sign In
          </Button>
        </form>
        <div>
          <div className="text-center mt-6 text-sm line- text-gray-500 dark:text-gray-400">
            Admin Credentials: <br />
            Email:{" "}
            <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{`admin@payflow.com`}</span>{" "}
            Password:{" "}
            <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{`password123`}</span>
          </div>
          <div className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400">
            Viewer Credentials: <br />
            Email:{" "}
            <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{`viewer@payflow.com`}</span>{" "}
            Password:{" "}
            <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{`password123`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
