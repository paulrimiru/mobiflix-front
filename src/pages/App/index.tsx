import * as React from 'react';

import { List, ListItem, ListItemText, SwipeableDrawer } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import { connect } from 'react-redux'

import MovieList from 'src/components/MovieList';
import { Movie } from 'src/components/MovieList/interfaces';
import { getMovies } from 'src/store/reducers/movies';

import { IAppProps, IAppState } from './interfaces';

import './App.scss';

class App extends React.Component<IAppProps, IAppState> {
  public state = {
    drawerToggle: false,
    filteredMovies: [],
    genre: [],
    movies: [],
    searchWord: '',
    selectedGenre: ''
  }

  public componentDidMount() {
    const { movies } = this.props;
  
    if (!movies || !movies.length) {
      this.props.getMovies().then(() => {
        this.processMovies();
      })
    }else {
      this.processMovies();
    }
  }

  public flatten = (arr) => {
    return arr.reduce((flat, toFlatten) => {
      return flat.concat(Array.isArray(toFlatten) ? this.flatten(toFlatten) : toFlatten);
    }, []);
  }

  public handleSearchOnChange = (event) => {
    const filteredMovies = this.state.movies.filter(
      (movie: Movie) => movie.name.toLowerCase().startsWith(event.target.value.toLowerCase())
    );

    this.setState({
      filteredMovies,
      searchWord: event.target.value,
    });
  }

  public handleSearchByGenre = (genre: string, index: number) => (event) => {
    const filteredMovies = this.state.movies.filter((movie: Movie) => {
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

  public processMovies() {
    const genre: string[][] = this.props.movies.map((movie: Movie) => movie.genre.split(','));
    this.setState({
      genre: Array.from(new Set(this.flatten(genre))),
      movies: this.props.movies,
    });
  }

  public render() {
    const { drawerToggle, searchWord, genre, movies, filteredMovies } = this.state;

    return (
      <div className="app">
        <AppBar
          position='fixed'
          className="app-bar"
        >
          <Toolbar className="app-bar__toolbar">
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              className="app-bar__toolbar-hum"
              onClick={this.toggleDrawer}
              >
              <MenuIcon fontSize="large"/>
            </IconButton>
            <Typography
              variant="h6"
              color="inherit"
              noWrap={true}
              className="app-bar__toolbar-header"
              >
              MobiFlix
            </Typography>
            <input
              className="app-bar__toolbar-search"
              placeholder="Search"
              value={this.state.searchWord}
              onChange={this.handleSearchOnChange}
              />
          </Toolbar>
          <SwipeableDrawer
            open={drawerToggle}
            onClose={this.toggleDrawer}
            onOpen={this.toggleDrawer}
          >
            <div
              tabIndex={0}
              role="button"
              onClick={this.toggleDrawer}
              onKeyDown={this.toggleDrawer}
              className="app-bar__drawer-title"
            >Genres</div>
            <div className="app-bar__drawer">
              <List>
                {genre.map((text, index) => (
                  <ListItem
                    button={true} 
                    key={index}
                    onClick={this.handleSearchByGenre(text, index)}
                    selected={this.state.selectedGenre === index.toString()}
                    >
                    <ListItemText
                      primary={
                        <div className="app-bar__drawer-item">{text}</div>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </div>
          </SwipeableDrawer>
        </AppBar>
        <MovieList
          movies={
            filteredMovies.length === 0
              ? movies
              : filteredMovies
          }
          searching={searchWord.length !== 0}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  movies: state.movies.data
})

const mapDispatchToProps = (dispatch) => ({
  getMovies: () => dispatch(getMovies())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)

