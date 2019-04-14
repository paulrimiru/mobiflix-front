import * as React from 'react';

import { connect } from 'react-redux'
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom';

import MovieList from 'src/pages/MovieList';
import MoviePlayer from 'src/pages/MoviePlayer';
import { getMovies } from 'src/store/reducers/movies';

import { IAppProps, IAppState } from './interfaces';

import './App.scss';

class App extends React.Component<IAppProps, IAppState> {

  public state = {
    drawerToggle: false,
    isLoading: false,
    filteredMovies: [],
    genre: [],
    searchWord: '',
    selectedGenre: ''
  };

  public render() {
    return (
      <div className="app">
        <Router>
          <>
            <Route exact={true} path="/" component={MovieList} />
            <Route path="/watch/:id" component={MoviePlayer} />
          </>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  cookies: ownProps.cookies,
  movies: state.movies.data,
})

const mapDispatchToProps = (dispatch) => ({
  getMovies: () => dispatch(getMovies())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
