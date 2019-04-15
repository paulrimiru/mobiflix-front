import { ExpandableMenuSection } from 'src/components/ApplicationBar/interfaces';
export interface MovieListProps {
  movies: Movie[];
  categories: Array<{
    name: string;
    id: string;
  }>;
  searching: boolean;
  getMovies: () => Promise<any[]>;
  getCategories: () => Promise<any[]>;
  cookies: any;
}

export interface IMovieListState {
  filteredMovies: Movie[];
  searchWord: string;
  drawerToggle: boolean;
  genre: string[];
  selectedGenre: string;
  selectedCategory: string;
  isLoading: boolean;
  expandedDrawerSection: ExpandableMenuSection;
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
  video_url?: string;
  category: {
    name: string;
    id: string;
  }
}