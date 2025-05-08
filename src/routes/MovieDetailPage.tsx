import React from "react";
import { useMovieStore } from "../stores/useMovieStore";
import { useTabStore } from "../stores/useTabStore";

const MovieDetailPage: React.FC = () => {
  const movie = useMovieStore((state) => state.selectedMovie);
  const setActiveTab = useTabStore((state) => state.setActiveTab);

  if (!movie) {
    return (
      <div className="text-center text-gray-400 pt-32">
        No movie selected.
        <br />
        <button
          onClick={() => setActiveTab("home")}
          className="mt-4 text-yellow-400 hover:text-yellow-300"
        >
          Back to Home
        </button>
      </div>
    );
  }
  
  return (
    <div className="py-8 max-w-6xl mx-auto">
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-96 bg-gradient-to-r from-gray-900 to-transparent">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-transparent z-10"></div>
          <div className="absolute inset-0">
            <img
              src="https://readdy.ai/api/search-image?query=epic%20cinematic%20scene%20from%20a%20sci%20fi%20movie%20with%20stunning%20visual%20effects%2C%20spaceships%20in%20battle%2C%20vibrant%20colors%2C%20dramatic%20lighting%2C%20photorealistic%20style%2C%20high%20quality%2C%208k%20resolution%2C%20professional%20photography&width=1200&height=400&seq=movie1&orientation=landscape"
              alt="Movie Banner"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-20 h-full flex items-end p-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold mb-4">
                Stellar Horizon: Beyond the Stars
              </h1>
              <div className="flex items-center space-x-4 text-sm mb-4">
                <span className="bg-yellow-500 text-gray-900 px-3 py-1 rounded-full font-medium">
                  8.9 Rating
                </span>
                <span className="text-gray-300">2h 35min</span>
                <span className="text-gray-300">Sci-Fi, Adventure</span>
                <span className="text-gray-300">May 8, 2025</span>
              </div>
              <div className="flex items-center space-x-4">
                <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-6 py-2 font-semibold transition-colors flex items-center cursor-pointer whitespace-nowrap rounded-lg">
                  Rate Movie
                </button>
                <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 font-semibold transition-colors flex items-center cursor-pointer whitespace-nowrap rounded-lg">
                  Add to Favorites
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="max-w-3xl">
            <h2 className="text-xl font-semibold mb-4">Synopsis</h2>
            <p className="text-gray-300 leading-relaxed mb-8">
              In the year 2157, humanity stands at the brink of interstellar
              civilization. When a mysterious signal from deep space threatens
              Earth's future, Commander Sarah Chen leads an elite team aboard
              the starship Horizon on a perilous mission beyond known space.
              As they uncover ancient alien artifacts and face impossible
              choices, the crew must race against time to prevent an impending
              catastrophe that could reshape the galaxy forever.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">
                  Director
                </h3>
                <p className="text-white">Alexandra Wright</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">Writers</h3>
                <p className="text-white">James Chen, Maria Rodriguez</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">Stars</h3>
                <p className="text-white">
                  Emily Stone, Michael B. Jordan, Chris Pine
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">
                  Production
                </h3>
                <p className="text-white">Universal Pictures</p>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">User Reviews</h2>
                <button className="text-yellow-400 hover:text-yellow-300 font-medium cursor-pointer whitespace-nowrap !rounded-button">
                  Write a Review
                </button>
              </div>

              <div className="space-y-6">
                {[1, 2, 3].map((review) => (
                  <div key={review} className="bg-gray-700 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div>
                          <h4 className="font-medium">MovieBuff{review}</h4>
                          <div className="flex items-center mt-1">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={i < 4 ? "text-yellow-400" : "text-gray-500"}>
                                ⭐
                              </span>
                            ))}
                            <span className="text-gray-400 text-sm ml-2">
                              May {8 - review}, 2025
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-300">
                      {review === 1
                        ? "A masterpiece of modern science fiction! The visual effects are breathtaking, and the story keeps you on the edge of your seat throughout."
                        : review === 2
                        ? "While the special effects are impressive, the plot sometimes feels a bit convoluted. Still enjoyable."
                        : "An instant classic. Great mix of practical and digital effects with strong character arcs."}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-center">
                <button className="text-yellow-400 hover:text-yellow-300 font-medium cursor-pointer whitespace-nowrap !rounded-button">
                  Load More Reviews
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;