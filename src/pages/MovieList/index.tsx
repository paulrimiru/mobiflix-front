import { Grid } from '@material-ui/core';
import * as React from 'react';
import { connect } from 'react-redux'

import AppBar from 'src/components/AppBar';
import MovieListItem from 'src/components/MovieListItem';
import { IMovieListState, Movie, MovieListProps } from 'src/pages/MovieList/interfaces';
import { getMovies } from 'src/store/reducers/movies';

import './MovieList.scss';


class MovieList extends React.Component<MovieListProps, IMovieListState> {
  public state = {
    drawerToggle: false,
    isLoading: false,
    filteredMovies: [],
    genre: [],
    searchWord: '',
    selectedGenre: ''
  }

  public async componentDidMount() {
    await this.props.getMovies();
    this.populateGenres(this.props.movies);
  }

  public async componentDidUpdate() {
    if (this.props.movies.length === 0) {
      await this.props.getMovies();
      this.populateGenres(this.props.movies);
    }
  }

  public populateGenres = (movies: Movie[]) => {
    this.setState({
      genre: Array.from(
        new Set(
          this.flatten(movies.map((movie: Movie) => movie.genre.split(',')))
        )
      )
    });
  }

  public flatten = (arr) => {
    return arr.reduce((flat, toFlatten) => {
      return flat.concat(Array.isArray(toFlatten) ? this.flatten(toFlatten) : toFlatten);
    }, []);
  }

  public handleSearchOnChange = (event) => {
    const filteredMovies = this.props.movies.filter(
      (movie: Movie) => movie.name.toLowerCase().startsWith(event.target.value.toLowerCase())
    );

    this.setState({
      filteredMovies,
      searchWord: event.target.value,
    });
  }

  public handleSearchByGenre = (genre: string, index: number) => (event) => {
    const filteredMovies = this.props.movies.filter((movie: Movie) => {
      const genres = movie.genre.split(',')
      return genres.filter((item) => item.toLowerCase() === genre.toLowerCase()).length;
    });

    this.setState({
      filteredMovies,
      selectedGenre: index.toString(),
    });

    this.toggleDrawer();
  }

  public toggleDrawer = () => {
    this.setState({
      drawerToggle: !this.state.drawerToggle,
    });
  }

  public render() {
    const { filteredMovies, searchWord } = this.state;
    const { movies } = this.props;
    const movieList = getMovieList(
      filteredMovies,
      movies,
      searchWord.length !== 0
    );

    return (
      movieList.length === 0
        ? <div className="nomovies">No movies found...</div>
        : renderMovieListPage(
            this.handleSearchOnChange,
            this.handleSearchByGenre,
            this.toggleDrawer,
            this.state.searchWord,
            this.state.drawerToggle,
            this.state.genre,
            this.state.selectedGenre,
            movieList
          )
    )
  }
}

const renderMovieListPage = (
  onSearch,
  onFilter,
  onToggleDrawer,
  searchWord,
  drawerToggle,
  genre,
  selectedGenre,
  movieList
) => (
  <div className="movie-list">
    <AppBar
      onSearch={onSearch}
      onFilter={onFilter}
      onToggleDrawer={onToggleDrawer}
      searchWord={searchWord}
      drawerToggle={drawerToggle}
      selectedGenre={selectedGenre}
      genre={genre}
    />
    <Grid
      container={true}
      className="movielist"
      spacing={0}
      wrap='wrap'
    > 
      {
        movieList.map((data, index) => (
          <MovieListItem
            {...data}
            key={new Date().toISOString() + index}
          />
        ))
      }
    </Grid>
  </div>
)

function getMovieList(filteredMovies: never[], movies: Movie[], searching: boolean): Movie[] {
  return filteredMovies.length === 0 && !searching
    ? movies
    : filteredMovies;
}

const mapStateToProps = (state, ownProps) => ({
  cookies: ownProps.cookies,
  movies: state.movies.data,
})

const mapDispatchToProps = (dispatch) => ({
  getMovies: () => dispatch(getMovies())
})

export default connect(mapStateToProps, mapDispatchToProps)(MovieList)
