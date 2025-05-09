import React, { useState } from "react";
import { useTabStore } from "../stores/useTabStore";
import { usePostStore } from "../stores/usePostStore";

const PostDetailPage: React.FC = () => {
  const {
    post,
    postId,
    getPost,
    deletePost,
    comments,
    createComment,
    updateComment,
    deleteComment,
    loading,
  } = usePostStore();
  const setActiveTab = useTabStore((state) => state.setActiveTab);

  const [commentText, setCommentText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedCommentText, setEditedCommentText] = useState("");
  const storedUser = localStorage.getItem("user");
  const currentUserId = storedUser ? Number(JSON.parse(storedUser).id) : null;

  if (loading) {
    return <div className="text-gray-400 text-center pt-32">Loading...</div>;
  }

  if (!post) return <div className="text-gray-400 text-center pt-32">No Post Found.</div>;

  return (
    <div className="py-8 max-w-4xl mx-auto">
      <div className="bg-gray-800 rounded-lg shadow-lg p-8">
        {/* Header */}
        <div>
          <button
            onClick={() => setActiveTab("community")}
            className="text-yellow-400 hover:text-yellow-300 mb-6 flex items-center cursor-pointer whitespace-nowrap rounded-lg"
          >
            &lt; Back to Community Board
          </button>
          <h1 className="text-3xl font-bold mb-6">{post.title}</h1>
          <div className="flex items-center text-gray-400">
            <div className="flex items-center mr-6">
              <span>{post.author_name}</span>
            </div>
            <span>{post.created_at}</span>
          </div>
        </div>

        {/* Content */}
        <div className="mb-6">
          <div className="bg-gray-700 text-white px-4 py-4 rounded-lg whitespace-pre-wrap leading-relaxed shadow-inner min-h-[200px]">
            {post.content}
          </div>
        </div>

        {/* Action Buttons */}
        {currentUserId === post.userId && (
          <div className="flex justify-end space-x-4 mb-8">
            <button
              onClick={() => setActiveTab("edit-post")}
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-6 py-2 font-semibold transition-colors flex items-center cursor-pointer whitespace-nowrap rounded-lg"
            >
              Edit Post
            </button>
            <button
              onClick={async () => {
                const ok = window.confirm("삭제할까요?");
                if (ok && postId !== null) {
                  const success = await deletePost(postId);
                  if (success) setActiveTab("community");
                }
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 font-semibold transition-colors flex items-center cursor-pointer whitespace-nowrap rounded-lg"
            >
              Delete Post
            </button>
          </div>
        )}

        {/* 구분선 추가 */}
        <hr className="border-t border-gray-600 mb-6" />

        {/* Comments Section */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Comments</h3>

          {/* Comment Form */}
          <div className="mb-8">
            <textarea
              placeholder="Write your comment..."
              className="w-full bg-gray-700 border-none text-white p-4 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none resize-none"
              rows={3}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            ></textarea>
            <div className="mt-4 flex justify-end">
              <button
                onClick={async () => {
                  if (!commentText.trim()) {
                    alert("댓글을 입력해주세요!");
                    return;
                  }

                  if (postId !== null) {
                    const success = await createComment(postId, commentText);
                    if (success) {
                      setCommentText("");
                      await getPost(postId);
                    }
                  }
                }}
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-6 py-2 font-semibold transition-colors cursor-pointer whitespace-nowrap rounded-lg"
              >
                Post Comment
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.commentId} className="bg-gray-700 rounded-lg p-6 relative">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{comment.name}</h4>
                  <p className="text-gray-400 text-sm">{comment.createdAt}</p>
                </div>

                {editingCommentId === comment.commentId ? (
                  <textarea
                    className="w-full bg-gray-600 text-white p-2 rounded mb-8 pr-28"
                    value={editedCommentText}
                    onChange={(e) => setEditedCommentText(e.target.value)}
                    rows={2}
                  />
                ) : (
                  <p className="text-gray-300 mb-8 pr-28">{comment.content}</p>
                )}

                {currentUserId === comment.userId && (
                  <div className="absolute bottom-4 right-4 flex space-x-2">
                    {editingCommentId === comment.commentId ? (
                      <>
                        <button
                          onClick={async () => {
                            const success = await updateComment(comment.commentId, editedCommentText);
                            if (success && postId !== null) {
                              setEditingCommentId(null);
                              await getPost(postId);
                            }
                          }}
                          className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-3 py-1 rounded-md shadow"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setEditingCommentId(null);
                            setEditedCommentText("");
                          }}
                          className="bg-gray-500 hover:bg-gray-600 text-white text-xs font-bold px-3 py-1 rounded-md shadow"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setEditingCommentId(comment.commentId);
                            setEditedCommentText(comment.content);
                          }}
                          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1 rounded-md shadow"
                        >
                          Edit
                        </button>
                        <button
                          onClick={async () => {
                            const ok = window.confirm("이 코멘트를 삭제할까요?");
                            if (ok && comment.commentId !== null) {
                              const success = await deleteComment(comment.commentId);
                              if (success && postId !== null) {
                                await getPost(postId);
                              }
                            }
                          }}
                          className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-1 rounded-md shadow"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
