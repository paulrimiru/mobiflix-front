import { Movie } from "src/MovieList/interfaces";

export interface IAppState {
  movies: Movie[],
  filteredMovies: Movie[];
  searchWord: string;
  drawerToggle: boolean;
  genre: string[];
  selectedGenre: string;
}