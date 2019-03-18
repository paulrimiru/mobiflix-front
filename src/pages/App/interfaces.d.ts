import { Movie } from 'src/components/MovieList/interfaces';

export interface IAppState {
  movies: Movie[],
  filteredMovies: Movie[];
  searchWord: string;
  drawerToggle: boolean;
  genre: string[];
  selectedGenre: string;
}

export interface IAppProps {
  movies: Movie[],
  getMovies: () => Promise<any[]>,
}
