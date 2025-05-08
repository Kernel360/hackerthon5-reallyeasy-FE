import React from "react";
import { useTabStore } from "../stores/useTabStore";

type Props = {
  setActiveTab: (tab: "home" | "community" | "post-detail" | "create-post" | "edit-post" | "login" | "signup") => void;
};

const CommunityPage: React.FC = () => {
  const setActiveTab = useTabStore((state) => state.setActiveTab);

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
            {[...Array(10)].map((_, index) => (
              <tr
                key={index}
                onClick={() => setActiveTab("post-detail")}
                className="border-b border-gray-700 hover:bg-gray-750 transition-colors cursor-pointer"
              >
                <td className="px-6 py-4 text-gray-400">{index + 1}</td>
                <td className="px-6 py-4 text-gray-100 hover:text-yellow-400 transition-colors">
                  {
                    [
                      "Just watched the new sci-fi blockbuster!",
                      "My thoughts on the latest superhero movie",
                      "Classic film recommendations",
                      "Documentary suggestions needed",
                      "Horror movie night discussion",
                      "Foreign film masterpieces",
                      "Action movie rankings 2025",
                      "Indie films you shouldn't miss",
                      "Movie soundtrack appreciation",
                      "Weekend movie marathon ideas",
                    ][index % 10]
                  }
                </td>
                <td className="px-6 py-4 text-gray-300">User{index + 1}</td>
                <td className="px-6 py-4 text-gray-400">May {8 - (index % 7)}, 2025</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommunityPage;
