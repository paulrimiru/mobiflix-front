import { Movie } from "src/components/MovieList/interfaces";

export interface IMoviePlayerProps {
  url?: string;
  movies: Movie[];
  match: {
    params: {
      id: string;
    }
  };
  getMovies: () => Promise<any>;
}

export interface IMoviePlayerState {
  movie: Movie;
}
