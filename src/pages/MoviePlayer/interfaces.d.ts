import { Movie } from "src/pages/MovieList/interfaces";

export interface IMoviePlayerProps {
  url?: string;
  movies: Movie[];
  match: {
    params: {
      id: string;
    }
  };
  getMovies: () => Promise<any>;
  isVoucherValid: boolean;
  validateVoucher: (voucher: string) => Promise<any>;
  fetchMovieDetails: (id: string, voucher: string) => Promise<any>;
  voucher: string; 
  movieDetails: Movie;
}

export interface IMoviePlayerState {
  voucher: string;
  movie: Movie;
  isValid: boolean;
  isLoading: boolean;
}
