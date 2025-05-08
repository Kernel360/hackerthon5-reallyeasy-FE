import React from "react";
import { useTabStore } from "../stores/useTabStore";

type Props = {
  isLoggedIn: boolean;
  onLogout: () => void;
};

const Header: React.FC<Props> = ({ isLoggedIn, onLogout }) => {
  const { activeTab, setActiveTab } = useTabStore();
  
  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 shadow-md z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-yellow-400 font-bold text-2xl cursor-pointer">
              CineView
            </h1>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => setActiveTab("home")}
              className={`whitespace-nowrap cursor-pointer transition-all duration-200 px-3 py-2 relative ${
                activeTab === "home"
                  ? "text-yellow-400"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Home
              {activeTab === "home" && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400"></span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("community")}
              className={`whitespace-nowrap cursor-pointer transition-all duration-200 px-3 py-2 relative ${
                activeTab === "community"
                  ? "text-yellow-400"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Community
              {activeTab === "community" && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400"></span>
              )}
            </button>
          </div>
          {/* <div className="flex items-center">
            {isLoggedIn ? (
              <span className="text-gray-300 text-sm">Hi, John Doe</span>
            ) : (
              <button
                onClick={() => setActiveTab("login")}
                className="text-yellow-400 hover:text-yellow-300 font-medium cursor-pointer whitespace-nowrap !rounded-button"
              >
                Login
              </button>
            )}
          </div> */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <span className="text-gray-300 text-sm">Hi, John Doe</span>
                <button
                  onClick={onLogout}
                  className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center space-x-2 text-sm cursor-pointer whitespace-nowrap !rounded-button"
                >
                  <i className="fas fa-sign-out-alt"></i>
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setActiveTab("login")}
                className="text-yellow-400 hover:text-yellow-300 font-medium cursor-pointer whitespace-nowrap !rounded-button"
              >
                Login
              </button>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button className="text-gray-300 hover:text-white focus:outline-none cursor-pointer">
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;