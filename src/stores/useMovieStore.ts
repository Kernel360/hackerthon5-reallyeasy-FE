import { create } from "zustand";

export type Movie = {
  id: number;
  title: string;
  rating: number;
  genre: string;
  duration: string;
  releaseDate: string;
  director: string;
  writers: string;
  stars: string;
  production: string;
  description: string;
};

type MovieState = {
  selectedMovie: Movie | null;
  setSelectedMovie: (movie: Movie) => void;
};

export const useMovieStore = create<MovieState>((set) => ({
  selectedMovie: null,
  setSelectedMovie: (movie) => set({ selectedMovie: movie }),
}));
