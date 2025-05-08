import React from "react";
import { useTabStore } from "../stores/useTabStore";
import MovieItem from "../components/MovieItem";

const HomePage: React.FC = () => {
  const setActiveTab = useTabStore((state) => state.setActiveTab);

  return (
    <div className="space-y-8">
      {/* Featured Movies Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Featured Movies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <MovieItem key={item} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
