import React from "react";
import { useTabStore } from "../stores/useTabStore";
import { useMovieStore } from "../stores/useMovieStore";

type Props = {
  item: number;
};

const MovieItem: React.FC<Props> = ({ item }) => {
  const setActiveTab = useTabStore((state) => state.setActiveTab); 
  const setSelectedMovie = useMovieStore((state) => state.setSelectedMovie);

  const handleClick = () => {
    setSelectedMovie({
      id: item,
      title: `Movie Title ${item}`,
      rating: Number((Math.random() * 2 + 3).toFixed(1)),
      genre: "Action, Adventure, Sci-Fi",
      duration: "2h 15min",
      releaseDate: "2025",
      director: "Sample Director",
      writers: "Writer One, Writer Two",
      stars: "Actor A, Actor B, Actor C",
      production: "CineStudio",
      description:
        "A brief description of the movie plot that gives viewers an idea of what to expect without revealing too much.",
    });

    setActiveTab("movie-detail");
  };

  return (
    <div onClick={handleClick}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105 cursor-pointer">
      <div className="h-64 bg-gray-700 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
          <i className="fas fa-film text-5xl text-gray-600"></i>
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-semibold">Movie Title {item}</h3>
          <div className="flex items-center">
            <span className="text-yellow-400 mr-1">⭐</span>
            <span>{(Math.random() * 2 + 3).toFixed(1)}</span>
          </div>
        </div>
        <p className="text-gray-400 text-sm mb-4">
          Action, Adventure, Sci-Fi • 2025
        </p>
        <p className="text-gray-300 mb-4">
          A brief description of the movie plot that gives viewers an idea of
          what to expect without revealing too much.
        </p>
        <div className="flex justify-between items-center">
          <button className="text-yellow-400 hover:text-yellow-300 font-medium cursor-pointer whitespace-nowrap !rounded-button">
            Read Review
          </button>
          <div className="flex space-x-2">
            <button className="text-gray-400 hover:text-white cursor-pointer">
              <i className="far fa-heart"></i>
            </button>
            <button className="text-gray-400 hover:text-white cursor-pointer">
              <i className="far fa-bookmark"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieItem;