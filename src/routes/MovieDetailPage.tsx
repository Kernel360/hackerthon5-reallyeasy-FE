import React, { useEffect, useState } from "react"
import { useMovieStore } from "../stores/useMovieStore"
import { useTabStore } from "../stores/useTabStore"
import type { MovieDetail } from "../stores/useMovieStore"

const MovieDetailPage: React.FC = () => {
  const movie = useMovieStore(state => state.selectedMovie)
  const setActiveTab = useTabStore(state => state.setActiveTab)
  const [detail, setDetail] = useState<MovieDetail | null>(null)
  const [rating, setRating] = useState(0)
  const [reviewContent, setReviewContent] = useState("")

  useEffect(() => {
    if (!movie?.movieId) return
    const fetchDetail = async () => {
      try {
        const res = await fetch(`/api/v1/movies/${movie.movieId}`)
        if (!res.ok) throw new Error("상세 영화 조회 실패")
        const data: MovieDetail = await res.json()
        setDetail(data)
      } catch (err) {
        console.error("❌ 영화 상세 조회 오류:", err)
      }
    }
    fetchDetail()
  }, [movie?.movieId])

 const token = localStorage.getItem("token");

  const handleSubmit = async () => {
    if (!token) {
      alert("로그인이 필요합니다.");
      setActiveTab("login");
      return;
   }

    if (!movie?.movieId || rating === 0 || !reviewContent.trim()) {
      alert("별점과 리뷰 내용을 모두 입력해주세요.");
      return;
    }

      try {
      const res = await fetch(`/api/v1/reviews/${movie.movieId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          rating,
          content: reviewContent,
        }),
      });

      if (!res.ok) throw new Error("리뷰 등록 실패");

      alert("리뷰가 등록되었습니다 ✅");

      // 리뷰 등록 후 평균 별점 갱신
      const updated = await fetch(`/api/v1/movies/${movie.movieId}`);
      const updatedData: MovieDetail = await updated.json();
      setDetail(updatedData);

      // 초기화
      setRating(0);
      setReviewContent("");
    } catch (err) {
      console.error("❌ 리뷰 등록 중 오류:", err);
      alert("리뷰 등록에 실패했습니다.");
}

  };

  return (
    <div className="py-8 flex justify-center">
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden w-full max-w-md">
        <div className="p-6">
          {/* ← 뒤로 가기 버튼 */}
          <div className="mb-4">
            <button
              onClick={() => setActiveTab("home")}
              className="text-gray-400 hover:text-white text-sm"
            >
              ← 영화 목록으로
            </button>
          </div>
          <h1 className="text-3xl font-bold mb-3 text-white">{detail?.title}</h1>
          <p className="text-yellow-400 mb-4">⭐{detail?.averageRating?.toFixed(1)}</p>
          </div>
        {/* 이미지 */}
        <div className="flex justify-center items-center py-8 bg-gray-800">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
            alt={detail?.title}
            className="max-w-full max-h-[550px] object-contain rounded"
          />
        </div>

        {/* 상세 정보 */}
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-3 text-white">{detail?.title}</h1>
          <p className="text-yellow-400 mb-4">⭐{detail?.averageRating?.toFixed(1)}</p>

          <h2 className="text-lg font-semibold text-white mb-2">📝 리뷰</h2>

          {/* ⭐ 별점 선택 */}
          <div className="flex items-center mb-3 space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-xl ${star <= rating ? "text-yellow-400" : "text-gray-500"}`}
              >
                ★
              </button>
            ))}
          </div>

          <textarea
            value={reviewContent}
            onChange={(e) => setReviewContent(e.target.value)}
            placeholder="리뷰를 남겨보세요..."
            className="w-full h-28 p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-400 resize-none"
          />

          <button
            onClick={handleSubmit}
            className="mt-3 w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded-lg"
          >
            리뷰 등록
          </button>
          {/* 다른 유저들이 남긴 리뷰 */}
            {detail?.reviews && detail.reviews.length > 0 && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-white mb-3">💬 다른 리뷰들</h2>
                <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                  {detail.reviews.slice(0, 5).map((review) => (
                    <div key={review.reviewId} className="bg-gray-700 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-yellow-400 font-semibold">{review.reviewer}</span>
                        <span className="text-sm text-gray-300">⭐ {review.rating}</span>
                      </div>
                      <p className="text-gray-200 text-sm whitespace-pre-line">{review.content}</p>
                      <p className="text-right text-xs text-gray-500 mt-2">{review.createdAt}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  )
}
export default MovieDetailPage