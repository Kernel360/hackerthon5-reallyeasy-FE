import React from "react";
import { useTabStore } from "../stores/useTabStore";

const PostEditPage: React.FC = () => {
  const setActiveTab = useTabStore((state) => state.setActiveTab);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveTab("post-detail");
  };

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
                className="w-full bg-gray-700 border-none text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                defaultValue="Just watched the new sci-fi blockbuster!"
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
                className="w-full bg-gray-700 border-none text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none resize-none"
                defaultValue={`Just finished watching the latest sci-fi blockbuster and I had to share my thoughts! The visual effects were absolutely stunning, especially during the space battle sequences. The director really pushed the boundaries of what's possible in modern cinema.

The plot was intricate but well-executed, keeping me engaged throughout the entire runtime. The character development was particularly strong, and the ending left me thinking about it long after I left the theater.`}
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