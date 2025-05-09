import React, { useState, useEffect } from "react";
import { useTabStore } from "../stores/useTabStore";
import { usePostStore } from "../stores/usePostStore";

const PostEditPage: React.FC = () => {
  const setActiveTab = useTabStore((state) => state.setActiveTab);
  const { post, postId, getPost, updatePost } = usePostStore();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("FREE");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setCategory(post.category);
    }
  }, [post]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post || postId === null) return;

    const updatedId = await updatePost(postId, { title, content, category });
    if (updatedId) {
      setActiveTab("post-detail");  // 탭 전환
      getPost(updatedId);           // 새로 저장된 데이터로 `getPost` 호출
    }
  };

  if (!post) return <div className="text-gray-400 text-center pt-32">No post to edit.</div>;

  return (
    <div className="py-8 max-w-4xl mx-auto">
      <div className="bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="mb-8">
        <button
            onClick={() => setActiveTab("post-detail")}
            className="text-yellow-400 hover:text-yellow-300 mb-6 flex items-center cursor-pointer whitespace-nowrap !rounded-button"
          >
            &lt; Back to Post
          </button>
          <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label htmlFor="edit-post-title" className="block text-sm font-medium text-gray-300 mb-2">
                Post Title
              </label>
              <input
                type="text"
                id="edit-post-title"
				value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-gray-700 border-none text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                required
              />
            </div>
            <div>
              <label htmlFor="edit-post-content" className="block text-sm font-medium text-gray-300 mb-2">
                Post Content
              </label>
              <textarea
                id="edit-post-content"
                rows={10}
				        value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full bg-gray-700 border-none text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none resize-none"
                required
              ></textarea>
            </div>
          </div>
          <div className="mt-8 flex space-x-4">
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-8 py-3 font-semibold transition-colors cursor-pointer whitespace-nowrap rounded-lg"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("post-detail")}
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

export default PostEditPage;