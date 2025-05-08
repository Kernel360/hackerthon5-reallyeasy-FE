import React from "react";
import { useTabStore } from "../stores/useTabStore";
import { usePostStore } from "../stores/usePostStore";

const PostDetailPage: React.FC = () => {
  const { post, deletePost, comments } = usePostStore();
  const setActiveTab = useTabStore((state) => state.setActiveTab);

  if (!post) return <div className="text-gray-400 text-center pt-32">No Post Found.</div>;

  return (
    <div className="py-8 max-w-4xl mx-auto">
      <div className="bg-gray-800 rounded-lg shadow-lg p-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => setActiveTab("community")}
            className="text-yellow-400 hover:text-yellow-300 mb-6 flex items-center cursor-pointer whitespace-nowrap rounded-lg"
          >
            &lt; Back to Community Board
          </button>
          <h1 className="text-3xl font-bold mb-4">
            {post.title}
          </h1>
          <div className="flex items-center text-gray-400">
            <div className="flex items-center mr-6">
              <span>{post.author_name}</span>
            </div>
            <span>{post.created_at}</span>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none mb-8">
          <p className="text-gray-300 leading-relaxed">
            {post.content}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab("edit-post")}
            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-6 py-2 font-semibold transition-colors flex items-center cursor-pointer whitespace-nowrap rounded-lg"
          >
            Edit Post
          </button>
          <button 
            onClick={async () => {
              const ok = window.confirm("삭제할까요?");
              if (ok) {
                const success = await deletePost(post.id);
                if (success) setActiveTab("community");
              }
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 font-semibold transition-colors flex items-center cursor-pointer whitespace-nowrap rounded-lg">
            Delete Post
          </button>
        </div>

        {/* Comments Section */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Comments</h3>

          {/* Comment Form */}
          <div className="mb-8">
            <textarea
              placeholder="Write your comment..."
              className="w-full bg-gray-700 border-none text-white p-4 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none resize-none"
              rows={3}
            ></textarea>
            <div className="mt-4 flex justify-end">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-6 py-2 font-semibold transition-colors cursor-pointer whitespace-nowrap rounded-lg">
                Post Comment
              </button>
            </div>
          </div>

          {/* Existing Comments */}
          <div className="space-y-6">
          {comments.map((comment) => (
              <div key={comment.commentId} className="bg-gray-700 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div>
                      <h4 className="font-medium">{comment.commentId}</h4>
                      <p className="text-gray-400 text-sm">
                        {comment.createdAt}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-300">
                {comment.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;