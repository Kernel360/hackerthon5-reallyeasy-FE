import React, { useEffect, useState } from "react";
import { useTabStore } from "../stores/useTabStore";

type Props = {
  isLoggedIn: boolean;
  onLogout: () => void;
};

const Header: React.FC<Props> = ({ isLoggedIn, onLogout }) => {
  const { activeTab, setActiveTab } = useTabStore();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const userDataString = localStorage.getItem("user");
    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString);
        setUserName(userData.userName || "Guest");
      } catch (e) {
        console.error("❌ 사용자 정보 파싱 실패:", e);
        setUserName("Guest");
      }
    } else {
      setUserName("Guest");
    }
  }, [isLoggedIn]);

  return (
    <nav className="bg-gray-800 px-4 py-3 fixed w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* 왼쪽: 로고 + 메뉴 */}
        <div className="flex items-center space-x-6">
          <h1
            className="text-yellow-400 font-bold text-2xl cursor-pointer"
            onClick={() => setActiveTab("home")}
          >
            CineView
          </h1>
          <button
            onClick={() => setActiveTab("home")}
            className={`text-sm ${
              activeTab === "home" ? "text-yellow-400" : "text-white hover:text-yellow-300"
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveTab("community")}
            className={`text-sm ${
              activeTab === "community"
                ? "text-yellow-400"
                : "text-white hover:text-yellow-300"
            }`}
          >
            Community
          </button>
        </div>

        {/* 오른쪽: 로그인 상태 */}
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <span className="text-white text-sm">Hi, {userName}</span>
              <button
                onClick={onLogout}
                className="text-yellow-400 text-sm hover:text-yellow-300"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => setActiveTab("login")}
              className="text-yellow-400 text-sm hover:text-yellow-300"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
