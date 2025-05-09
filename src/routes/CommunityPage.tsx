import React, { useEffect } from "react";
import { useTabStore } from "../stores/useTabStore";
import { usePostStore } from "../stores/usePostStore";

const CommunityPage: React.FC = () => {
  const setActiveTab = useTabStore((state) => state.setActiveTab);
  const { posts, pagination, searchPosts } = usePostStore();

  const currentPage = pagination?.page ?? 0;
  const totalPages = pagination?.totalPage ?? 1;

  useEffect(() => {
    searchPosts("FREE", 0, 10);
  }, []);

  const handlePageChange = (page: number) => {
    if (page >= 0 && page < totalPages) {
      searchPosts("FREE", page, 10);
    }
  };
  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Community Board</h2>
        <button
          onClick={() => setActiveTab("create-post")}
          className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-6 py-2 font-semibold transition-colors flex items-center cursor-pointer whitespace-nowrap rounded-lg"
        >
          Write Post
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-700">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 w-24">#</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Title</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 w-48">Author</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 w-48">Date Posted</th>
            </tr>
          </thead>
          <tbody>
           {posts.map((post) => (
              <tr
                key={post.id}
                onClick={() => {
                  usePostStore.getState().setPostId(post.id);
                  usePostStore.getState().getPost(post.id);
                  setActiveTab("post-detail");
                }}
                className="cursor-pointer hover:bg-gray-700 transition"
              >
                <td className="px-6 py-4 text-gray-400">{post.id}</td>
                <td className="px-6 py-4 text-gray-100 hover:text-yellow-400 transition-colors">{post.title}</td>
                <td className="px-6 py-4 text-gray-300">{post.author_name}</td>
                <td className="px-6 py-4 text-gray-400">{post.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 페이징 영역 */}
      <div className="mt-6 flex justify-center space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-4 py-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
          disabled={currentPage === 0}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`w-10 h-10 rounded-full ${
              currentPage === i
                ? "bg-yellow-500 text-gray-900"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
          disabled={currentPage >= totalPages - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CommunityPage;
