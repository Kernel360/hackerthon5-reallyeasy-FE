import React, { useState } from "react";
import { useTabStore } from "../stores/useTabStore";

const LoginPage: React.FC = () => {
  const setActiveTab = useTabStore((state) => state.setActiveTab);
  const login = useTabStore((state) => state.login); // 필요 시 상태 기반 로그인 처리도 가능

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userName: userId,
          password: password
        }),
        credentials: "include"
      });

      if (response.ok) {
        const data = await response.json();
        console.log("✅ 로그인 성공");

        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("token", data.token);

        login(); // 상태를 통해 로그인 처리 (선택 사항)
        setActiveTab("home"); // 로그인 후 홈으로 이동
      } else {
        console.log("❌ 로그인 실패");
        alert("로그인 실패: 아이디 또는 비밀번호를 확인해주세요.");
      }
    } catch (err) {
      console.error("❌ 로그인 중 오류 발생:", err);
      alert("네트워크 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-gray-400">Sign in to continue to CineView</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
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
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-700 border-none text-white pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                placeholder="Enter your password"
                required
              />
            </div>
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
            Don't have an account?{" "}
            <button
              onClick={() => setActiveTab("signup")}
              className="text-yellow-400 hover:text-yellow-300 font-medium"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
