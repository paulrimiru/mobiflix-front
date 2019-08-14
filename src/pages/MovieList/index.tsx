import { Grid } from '@material-ui/core';
import * as React from 'react';
import { connect } from 'react-redux'

import AppBar from 'src/components/ApplicationBar';
import { ExpandableMenuSection } from 'src/components/ApplicationBar/interfaces';
import MovieListItem from 'src/components/MovieListItem';
import { IMovieListState, Movie, MovieListProps } from 'src/pages/MovieList/interfaces';
import { fetchCategories } from 'src/store/reducers/categories';
import { getMovies } from 'src/store/reducers/movies';

import './MovieList.scss';


class MovieList extends React.Component<MovieListProps, IMovieListState> {
  public state = {
    drawerToggle: false,
    isLoading: false,
    filteredMovies: [],
    genre: [],
    searchWord: '',
    selectedGenre: '',
    selectedCategory: '',
    expandedDrawerSection: ExpandableMenuSection.None,
  }

  public async componentDidMount() {
    await this.props.getMovies();
    this.populateGenres(this.props.movies);
    await this.props.getCategories();
  }

  public async componentDidUpdate() {
    if (this.props.movies.length === 0) {
      await this.props.getMovies();
      this.populateGenres(this.props.movies);
      await this.props.getCategories();
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

  public handleFilter = (filterQuery: string, index: number, type: ExpandableMenuSection) => (event) => {
    let filteredMovies: Movie[] = [];
    switch (type) {
      case ExpandableMenuSection.Categories:
        filteredMovies = this.props.movies.filter(
          (movie: Movie) => movie.category.name.toLowerCase() === filterQuery.toLowerCase()
        );
    
        this.setState({
          filteredMovies,
          selectedCategory: index.toString(),
        });
    
        this.toggleDrawer();
        break;
      case ExpandableMenuSection.Genres:
        filteredMovies = this.props.movies.filter((movie: Movie) => {
          const genres = movie.genre.split(',')
          return genres.filter((item) => item.toLowerCase() === filterQuery.toLowerCase()).length;
        });
    
        this.setState({
          filteredMovies,
          selectedGenre: index.toString(),
        });
    
        this.toggleDrawer();
        break;
      default:
        break;
    }
  }

  public toggleDrawer = () => {
    this.setState({
      drawerToggle: !this.state.drawerToggle,
    });
  }

  public handleExpandableDrawerSectionChange = (section: ExpandableMenuSection) => () => {
    this.setState({
      expandedDrawerSection: section
    })
  }

  public render() {
    const { filteredMovies, searchWord } = this.state;
    const { movies, categories } = this.props;
    const movieList = getMovieList(
      filteredMovies,
      movies,
      searchWord.length !== 0
    );

    return (
      renderMovieListPage(
        this.handleSearchOnChange,
        this.handleFilter,
        this.toggleDrawer,
        this.state.searchWord,
        this.state.drawerToggle,
        this.state.expandedDrawerSection,
        this.handleExpandableDrawerSectionChange,
        this.state.genre,
        this.state.selectedGenre,
        this.state.selectedCategory,
        categories,
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
  expandedDrawerItem,
  handleExpandableDrawerSectionChange,
  genre,
  selectedGenre,
  selectedCategory,
  categories,
  movieList
) => (
  <div className="movie-list">
    <AppBar
      onSearch={onSearch}
      onFilter={onFilter}
      onToggleDrawer={onToggleDrawer}
      searchWord={searchWord}
      drawerToggle={drawerToggle}
      expandedItem={expandedDrawerItem}
      handleMenuExpansion={handleExpandableDrawerSectionChange}
      selectedGenre={selectedGenre}
      selectedCategory={selectedCategory}
      categories={categories}
      genre={genre}
    />
    <>
      {
        movieList.length === 0
          ? <div className="nomovies">No movies found...</div>
          : <Grid
              container={true}
              className="movielist"
              spacing={0}
              wrap='wrap'
            > 
              {
                movieList.map(
                  (data, index) => (
                    <MovieListItem
                      {...data}
                      key={new Date().toISOString() + index}
                    />
                  )
                )
              }
            </Grid>
      }
    </>
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
  categories: state.categories.data,
})

const mapDispatchToProps = (dispatch) => ({
  getMovies: () => dispatch(getMovies()),
  getCategories: () => dispatch(fetchCategories()),
})

export default connect(mapStateToProps, mapDispatchToProps)(MovieList)
