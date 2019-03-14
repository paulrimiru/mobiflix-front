import * as React from 'react';

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';

import MovieList from 'src/MovieList';
import { Movie } from 'src/MovieList/interfaces';
import { http } from 'src/Utils/axios-helpers';

import { IAppState } from './interfaces';

import './App.scss';
import { SwipeableDrawer, List, ListItem, ListItemText } from '@material-ui/core';

class App extends React.Component<{}, IAppState> {
  public state = {
    drawerToggle: false,
    filteredMovies: [],
    genre: [],
    movies: [],
    searchWord: '',
    selectedGenre: ''
  }

  public componentDidMount() {
    if (!this.state.movies.length) {
      http.get('content/all/')
        .then((resp) => {
          const movies = resp.data;

          const genre = movies.map((movie: Movie) => movie.genre.split(','))
          this.setState({
            genre: Array.from(new Set(genre.flat())),
            movies,
          })
        })
        .catch((error) => console.log('>>>>>>', error.message));
    }
  }

  public handleSearchOnChange = (event) => {
    const filteredMovies = this.state.movies.filter((movie: Movie) => movie.name.startsWith(event.target.value));
    this.setState({
      filteredMovies,
      searchWord: event.target.value,
    });
  }

  public handleSearchByGenre = (genre: string, index: number) => (event) => {
    const filteredMovies = this.state.movies.filter((movie: Movie) => {
      const genres = movie.genre.split(',')
      return genres.filter((item) => item === genre).length;
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

export default App;
