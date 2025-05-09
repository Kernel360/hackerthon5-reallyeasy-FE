import React, { useEffect, useState } from "react";
import { useTabStore } from "../stores/useTabStore";
import { useMovieStore } from "../stores/useMovieStore";
import type { Movie } from "../stores/useMovieStore";

const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const setSelectedMovie = useMovieStore((state) => state.setSelectedMovie);
  const setActiveTab = useTabStore((state) => state.setActiveTab);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/movies?size=18&page=${currentPage}`, {
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          const text = await response.text();
          throw new Error(text);
        }

        const data = await response.json();
        const list = Array.isArray(data) ? data : data.content || [];

        setMovies(list);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error("❌ 영화 목록 조회 실패:", err);
        setMovies([]);
      }
    };

    fetchMovies();
  }, [currentPage]);

  return (
    <div className="space-y-8">
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">🎬 영화 목록</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies.map((movie, index) => (
            <div
              key={movie.movieId ?? `fallback-${index}`}
              className="bg-gray-800 rounded-lg shadow-md p-4 cursor-pointer"
              onClick={() => {
                setSelectedMovie(movie);
                setActiveTab("movie-detail");
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                alt={movie.title}
                className="w-full h-64 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold text-white">{movie.title}</h3>
              <p className="text-gray-400">
                {movie.overview.length > 100
                  ? `${movie.overview.slice(0, 100)}...`
                  : movie.overview}
              </p>
              <p className="text-yellow-400 mt-2">⭐ {movie.averageRating.toFixed(1)}</p>
            </div>
          ))}
        </div>

        {/* 페이지네이션 */}
        <div className="mt-8 flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={`px-4 py-2 rounded ${
                i === currentPage ? "bg-yellow-500 text-black" : "bg-gray-600 text-white"
              } hover:bg-yellow-600 transition`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
