import React from "react";
import { useTabStore } from "../stores/useTabStore";


const LoginPage: React.FC = () => {
  const login = useTabStore((state) => state.login);
  const setActiveTab = useTabStore((state) => state.setActiveTab);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-gray-400">Sign in to continue to CineView</p>
        </div>
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            login();
          }}
        >
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
              Username
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <i className="fas fa-user"></i>
              </span>
              <input
                type="text"
                id="username"
                className="w-full bg-gray-700 border-none text-white pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                placeholder="Enter your username"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <i className="fas fa-lock"></i>
              </span>
              <input
                type="password"
                id="password"
                className="w-full bg-gray-700 border-none text-white pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <a href="#" className="text-sm text-yellow-400 hover:text-yellow-300">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-3 rounded-lg transition-colors cursor-pointer"
          >
            Sign In
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Don't have an account?{' '}
            <button onClick={() => setActiveTab("signup")} className="text-yellow-400 hover:text-yellow-300 font-medium">
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;