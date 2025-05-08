import React, { useState } from "react";
import { useTabStore } from "../stores/useTabStore";

const SignupPage: React.FC = () => {
  const setActiveTab = useTabStore((state) => state.setActiveTab);

  const [username, setUsername] = useState("");
  const [isUsernameChecked, setIsUsernameChecked] = useState(false);
  const [usernameMessage, setUsernameMessage] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "">("");

  const handleUsernameCheck = async () => {
    try {
      const response = await fetch(`/api/v1/users/check-username?username=${username}`);
      if (response.ok) {
        const { available } = await response.json();
        if (available) {
          setUsernameMessage("✅ 사용 가능한 아이디입니다.");
          setIsUsernameChecked(true);
        } else {
          setUsernameMessage("❌ 이미 사용 중인 아이디입니다.");
          setIsUsernameChecked(false);
        }
      } else {
        setUsernameMessage("❌ 서버 오류로 확인에 실패했습니다.");
        setIsUsernameChecked(false);
      }
    } catch (err) {
      setUsernameMessage("❌ 네트워크 오류로 확인에 실패했습니다.");
      setIsUsernameChecked(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isUsernameChecked) {
      alert("아이디 중복 확인을 해주세요.");
      return;
    }

    const signupData = {
      username,
      password,
      fullName,
      bio,
      gender,
    };

    console.log("📦 가입 요청 데이터:", signupData);
    // TODO: 실제 가입 API 호출
    setActiveTab("home");
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-gray-400">Join the CineView community</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Username + 중복확인 */}
          <div>
            <label htmlFor="signup-username" className="block text-sm font-medium text-gray-300 mb-2">
              Username
            </label>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <i className="fas fa-user"></i>
                </span>
                <input
                  type="text"
                  id="signup-username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setIsUsernameChecked(false);
                    setUsernameMessage("");
                  }}
                  className="w-full bg-gray-700 border-none text-white pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                  placeholder="Choose a username"
                  required
                />
              </div>
              <button
                type="button"
                onClick={handleUsernameCheck}
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-4 rounded-lg transition-colors"
              >
                중복확인
              </button>
            </div>
            {usernameMessage && (
              <p className={`text-sm mt-1 ${isUsernameChecked ? "text-green-400" : "text-red-400"}`}>
                {usernameMessage}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="signup-password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="signup-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-700 border-none text-white pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                placeholder="Create a password"
                required
              />
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label htmlFor="full-name" className="block text-sm font-medium text-gray-300 mb-2">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="full-name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-gray-700 border-none text-white pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-2">
              Bio
            </label>
            <div className="relative">
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="w-full bg-gray-700 border-none text-white pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none resize-none"
                placeholder="Tell us about yourself"
              ></textarea>
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Gender</label>
            <div className="flex space-x-4">
              {['male', 'female'].map((g) => (
                <label key={g} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={gender === g}
                    onChange={() => setGender(g as "male" | "female")}
                    className="hidden peer"
                  />
                  <div className="w-5 h-5 border-2 border-gray-500 rounded-full flex items-center justify-center mr-2 peer-checked:border-yellow-400">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full hidden peer-checked:block"></div>
                  </div>
                  <span className="text-gray-300 capitalize">{g}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-3 rounded-lg transition-colors cursor-pointer"
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
