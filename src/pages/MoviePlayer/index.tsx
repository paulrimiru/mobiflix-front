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
import { validateVoucher } from 'src/store/reducers/voucher';
import { Modal, Button } from '@material-ui/core';
import { fetchMovieDetails } from '../../store/reducers/movie/index';

class MoviePlayer extends React.Component<IMoviePlayerProps, IMoviePlayerState> {

  public state: IMoviePlayerState = {
    movie: {
      id: '',
      name: 'Movie name',
      poster: '',
      description: '',
      time: '',
      genre: '',
      stars: '',
      director: '',
      imdb: '',
      release: '',
      rating: '',
    },
    isValid: false,
    isLoading: true,
    voucher: ''
  }

  public handleVoucherInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      voucher: event.target.value,
    })
  }

  public handleSVoucherVerifySubmit = (event) => {
    this.setState({
      isLoading: true
    });

    this.props.validateVoucher(this.state.voucher)
      .then(async () => {
        await this.props.fetchMovieDetails(this.props.match.params.id, this.state.voucher);

        this.setState({
          isValid: true,
          isLoading: false,
          movie: this.props.movieDetails,
        })
      })
      .catch(() => {
        alert('voucher is invalid');
      })
  };

  public async componentDidMount() {
    const { voucher, validateVoucher, match } = this.props;
    console.log('>>>>>>>>>> player', this.props)

    if(voucher.length > 0) {
      validateVoucher(voucher)
        .then(async () => {
          await this.props.fetchMovieDetails(match.params.id, voucher);
          this.setState({
            isValid: true,
            movie: this.props.movieDetails,
            isLoading: false
          });
        })
        .catch((err) => console.log(err));
    } else {
      this.setState({
        isLoading: false
      });
    }
  }

  public render() {
    if (this.state.isLoading) {
      return (<Spinner />)
    } else if (!this.state.isValid) {
      return (
        <div className="movieplayer-voucher">
          <div className="movieplayer-voucher-container">
            <input
              className="movieplayer-voucher-container__input"
              placeholder="Search"
              value={this.state.voucher}
              onChange={this.handleVoucherInputChange}
              />
            <div
              className="movieplayer-voucher-container__submit"
              onClick={this.handleSVoucherVerifySubmit}
            >Submit</div>
          </div>
        </div>
      )
    } else {
      return (
        <>
          {
            this.state.movie
              ? <div className="movieplayer">
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
                    <div className="movieplayer-info__name">{ this.state.movie.name }</div>
                    <div className="movieplayer-info__actors">{ this.state.movie.stars }</div>
                    <div className="movieplayer-info__description">{ this.state.movie.description }</div>
                  </div>
                </div>
              : <Spinner /> 
          }
        </>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  isVoucherValid: state.voucher.isValid,
  voucher: state.voucher.voucher,
  movieDetails: state.movie.movieDetails,
})

const mapDispatchToProps = (dispatch) => ({
  getMovies: () => dispatch(getMovies()),
  validateVoucher: (voucher) => dispatch(validateVoucher(voucher)),
  fetchMovieDetails: (id, voucher) => dispatch(fetchMovieDetails(id, voucher))
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviePlayer)