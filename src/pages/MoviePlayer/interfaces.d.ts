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
  movieDetails: Movie & {
    base_url: string;
    expiry_date: string;
    status: Status;
  };
}

export enum Status {
  Watch = 'WATCH'
}

export interface IMoviePlayerState {
  voucher: string;
  isValid: boolean;
  isLoading: boolean;
  verificationSkipped: boolean;
}
