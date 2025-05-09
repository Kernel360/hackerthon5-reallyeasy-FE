import { create } from "zustand";

export interface Movie {
  movieId: number;
  tmdbId: number;
  title: string;
  originalLanguage: string;
  overview: string;
  posterPath: string;
  releaseDate: string;
  averageRating: number;
  reviewCount: number;
}

export interface Review {
  reviewId: number;
  movieId: number;
  tmdbId: number;
  posterPath: string;
  reviewerId: number;
  reviewer: string;
  content: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface MovieDetail {
  movieId: number;
  tmdbId: number;
  title: string;
  original_language: string;
  overview: string;
  poster_path: string;
  release_date: string;
  averageRating: number;
  reviewCount: number;
  reviews: Review[];
}

interface MovieStore {
  selectedMovie: Movie | null;
  setSelectedMovie: (movie: Movie) => void;
}

export const useMovieStore = create<MovieStore>((set) => ({
  selectedMovie: null,
  setSelectedMovie: (movie) => set({ selectedMovie: movie }),
}));
