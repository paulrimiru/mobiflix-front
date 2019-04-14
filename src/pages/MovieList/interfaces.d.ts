export interface MovieListProps {
  movies: Movie[];
  searching: boolean;
  getMovies: () => Promise<any[]>;
  cookies: any;
}

export interface IMovieListState {
  filteredMovies: Movie[];
  searchWord: string;
  drawerToggle: boolean;
  genre: string[];
  selectedGenre: string;
  isLoading: boolean;
}


export interface Movie {
  id: string;
  name: string;
  poster: string;
  description: string;
  time: string;
  genre: string;
  stars: string;
  director: string;
  imdb: string;
  release: string;
  rating: string;
}