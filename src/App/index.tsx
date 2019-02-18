import * as React from 'react';

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

import MovieList from 'src/MovieList';
import { http } from 'src/Utils/axios-helpers';

import { IAppState } from './interfaces';

import './App.scss';

class App extends React.Component<{}, IAppState> {
  public state = {
    movies: []
  }

  public componentDidMount() {
    http.get('content/all/')
      .then((resp) => {
        this.setState({
          movies: resp.data,
        })
      })
      .catch((error) => console.log('>>>>>>', error.message));
  }

  public render() {
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
              >
              <MenuIcon fontSize="large"/>
            </IconButton>
            <Typography
              variant="h6"
              color="inherit"
              noWrap={true}
              className="app-bar__toolbar-header"
              >
              Movies
            </Typography>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              className="app-bar__toolbar-searchicon"
              >
              <SearchIcon fontSize="large" />
            </IconButton>
          </Toolbar>
        </AppBar>
        <MovieList
          movies={this.state.movies}
        />
      </div>
    );
  }
}

export default App;
