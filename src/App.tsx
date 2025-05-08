import React, { useState } from "react";
import { useTabStore } from "./stores/useTabStore";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./routes/HomePage";
import MovieDetailPage from "./routes/MovieDetailPage";
import CommunityPage from "./routes/CommunityPage";
import PostDetailPage from "./routes/PostDetailPage";
import PostCreatePage from "./routes/PostCreatePage";
import PostEditPage from "./routes/PostEditPage";
import LoginPage from "./routes/LoginPage";
import SignupPage from "./routes/SignupPage";

const App: React.FC = () => {
  const activeTab = useTabStore((state) => state.activeTab);
  const setActiveTab = useTabStore((state) => state.setActiveTab);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setActiveTab("home");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab("home");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <main className="container mx-auto px-4 pt-24 pb-12 min-h-[1024px]">
        <div className="max-w-7xl mx-auto">
        {activeTab === "home" && <HomePage />}
          {activeTab === "movie-detail" && <MovieDetailPage />}
          {activeTab === "community" && <CommunityPage />}
          {activeTab === "post-detail" && <PostDetailPage />}
          {activeTab === "create-post" && <PostCreatePage />}
          {activeTab === "edit-post" && <PostEditPage />}
          {activeTab === "login" && <LoginPage />}
          {activeTab === "signup" && <SignupPage />}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;