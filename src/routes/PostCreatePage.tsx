import React, { useState } from "react";
import { useTabStore } from "../stores/useTabStore";
import { usePostStore } from "../stores/usePostStore";

const PostCreatePage: React.FC = () => {
  const setActiveTab = useTabStore((state) => state.setActiveTab);
  const createPost = usePostStore((state) => state.createPost);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category] = useState("FREE"); // 필요 시 select로 확장 가능

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newPostId = await createPost({ title, content, category });
    if (newPostId) {
      setActiveTab("community");
    }
  };

  return (
    <div className="py-8 max-w-4xl mx-auto">
      <div className="bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="mb-8">
          <button
            onClick={() => setActiveTab("community")}
            className="text-yellow-400 hover:text-yellow-300 mb-6 flex items-center cursor-pointer whitespace-nowrap rounded-lg"
          >
            &lt; Back to Community Board
          </button>
          <h1 className="text-3xl font-bold mb-6">Create New Post</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label htmlFor="post-title" className="block text-sm font-medium text-gray-300 mb-2">
                Post Title
              </label>
              <input
                type="text"
                id="post-title"
				value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-gray-700 border-none text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                placeholder="Enter your post title"
                required
              />
            </div>
            <div>
              <label htmlFor="post-content" className="block text-sm font-medium text-gray-300 mb-2">
                Post Content
              </label>
              <textarea
                id="post-content"
				        value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
                className="w-full bg-gray-700 border-none text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none resize-none"
                placeholder="Write your post content here..."
                required
              ></textarea>
            </div>
          </div>

          <div className="mt-8 flex space-x-4">
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-8 py-3 font-semibold transition-colors cursor-pointer whitespace-nowrap rounded-lg"
            >
              Create Post
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("community")}
              className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 font-semibold transition-colors cursor-pointer whitespace-nowrap rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostCreatePage;