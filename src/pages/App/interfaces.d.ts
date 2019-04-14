import { Movie } from 'src/pages/MovieList/interfaces';

export interface IAppState {
  filteredMovies: Movie[];
  searchWord: string;
  drawerToggle: boolean;
  genre: string[];
  selectedGenre: string;
  isLoading: boolean;
}

export interface IAppProps {
  movies: Movie[];
  getMovies: () => Promise<any[]>;
  cookies: any;
}
