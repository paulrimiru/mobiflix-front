import * as React from 'react';

import IconButton from '@material-ui/core/IconButton';
import BackIcon from '@material-ui/icons/ArrowBackRounded';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getMovies } from 'src/store/reducers/movies';

import { IMoviePlayerProps, IMoviePlayerState } from './interfaces';

import './MoviePlayer.scss';
import Spinner from 'src/components/Spinner';

export class MoviePlayer extends React.Component<IMoviePlayerProps, IMoviePlayerState> {

  public state: IMoviePlayerState = {
    movie: {
      id: '',
      name: '',
      poster: '',
      description: '',
      time: '',
      genre: '',
      stars: '',
      director: '',
      imdb: '',
      release: '',
      rating: '',
    }
  }

  public componentDidMount() {
    console.log(this.props);

    const { movies } = this.props;
  
    if (!movies || !movies.length) {
      this.props.getMovies().then(() => {
        this.setState({
          movie: (this.props.movies.find(({ id }) => id === this.props.match.params.id))!
        })
      })
    }else {
      this.setState({
        movie: (this.props.movies.find(({ id }) => id === this.props.match.params.id))!
      })
    }
  }

  public render() {
    if (this.state.movie) {
      const { name, stars, description } = this.state.movie;
      return (
        <div className="movieplayer">
          <Link
            to="/"
            className="movieplayer-back">
            <IconButton
              color="inherit"
              aria-label="back"
              >
              <BackIcon fontSize="large"/>
            </IconButton>
          </Link>
          
          <ReactPlayer
            url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
            playing={false}
            className="movieplayer-player"
            controls={true}
            />
          
          <div className="movieplayer-info">
            <div className="movieplayer-info__name">{ name }</div>
            <div className="movieplayer-info__actors">{ stars }</div>
            <div className="movieplayer-info__description">{ description }</div>
          </div>
        </div>
      )
    }

    return (
      <Spinner />
    )
  }
}

const mapStateToProps = (state) => ({
  movies: state.movies.data
})

const mapDispatchToProps = (dispatch) => ({
  getMovies: () => dispatch(getMovies())
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviePlayer)