import React, { useState } from "react";
import { useTabStore } from "../stores/useTabStore";

const SignupPage: React.FC = () => {
  const setActiveTab = useTabStore((state) => state.setActiveTab);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("");

  const [userIdAvailable, setUserIdAvailable] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  const isFormValid =
    userIdAvailable && passwordValid && gender && name.length >= 1;

  const checkUserId = async () => {
    if (userName.length < 2) {
      alert("아이디는 최소 2글자 이상이어야 합니다.");
      return;
    }

    try {
      const response = await fetch(`/api/v1/users/${encodeURIComponent(userName)}/exists`);
      const isAvailable = await response.json();
      setUserIdAvailable(isAvailable);
    } catch (error) {
      console.error("중복확인 실패:", error);
      setUserIdAvailable(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = { userName, password, name, bio, gender };

    try {
      const response = await fetch("/api/v1/users/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("회원가입 실패");

      alert("가입이 완료되었습니다!");
      setActiveTab("login");
    } catch (err) {
      console.error("회원가입 오류:", err);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-gray-400">Join the CineView community</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Username */}
          <div>
            <label htmlFor="signup-username" className="block text-sm font-medium text-gray-300 mb-2">Username</label>
            <div className="relative flex">
              <input
                type="text"
                id="signup-username"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                  setUserIdAvailable(false);
                }}
                className="flex-1 bg-gray-700 border-none text-white pl-4 pr-4 py-3 rounded-l-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                placeholder="Choose a username"
                required
              />
              <button
                type="button"
                onClick={checkUserId}
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-4 rounded-r-lg font-medium"
              >
                Check
              </button>
            </div>
            {userName && (
              <div className={`text-sm mt-1 ${userIdAvailable ? "text-green-400" : "text-red-400"}`}>
                {userIdAvailable ? "✔ 사용 가능" : "❌ 사용 불가"}
              </div>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="signup-password" className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input
              type="password"
              id="signup-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordValid(e.target.value.length >= 4);
              }}
              className="w-full bg-gray-700 border-none text-white pl-4 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              placeholder="Create a password"
              required
            />
            <small className="text-gray-400 block mt-1">비밀번호는 4자 이상</small>
          </div>

          {/* Name */}
          <div>
            <label htmlFor="full-name" className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
            <input
              type="text"
              id="full-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-700 border-none text-white pl-4 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Bio */}
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
            <textarea
              id="bio"
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full bg-gray-700 border-none text-white pl-4 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none resize-none"
              placeholder="Tell us about yourself"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Gender</label>
            <div className="flex space-x-4">
              {["M", "F"].map((g) => (
                <label key={g} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={gender === g}
                    onChange={(e) => setGender(e.target.value)}
                    className="hidden peer"
                  />
                  <div className="w-5 h-5 border-2 border-gray-500 rounded-full flex items-center justify-center mr-2 peer-checked:border-yellow-400">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full hidden peer-checked:block"></div>
                  </div>
                  <span className="text-gray-300">{g === "M" ? "Male" : "Female"}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-3 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
          >
            Create Account
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Already have an account?{" "}
            <button
              onClick={() => setActiveTab("login")}
              className="text-yellow-400 hover:text-yellow-300 font-medium cursor-pointer"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
