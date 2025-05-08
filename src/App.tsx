import { Routes, Route } from "react-router-dom";
import LoginPage from "../src/routes/LoginPage";
import SignupPage from "../src/routes/SignupPage";
import PostListPage from "../src/routes/HomePage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/posts" element={<PostListPage />} />
    </Routes>
  );
}

export default App;
