import * as React from 'react';

import IconButton from '@material-ui/core/IconButton';
import BackIcon from '@material-ui/icons/ArrowBackRounded';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Player, BigPlayButton } from 'video-react';

import Spinner from 'src/components/Spinner';
import { fetchMovieDetails } from 'src/store/reducers/movie';
import { getMovies } from 'src/store/reducers/movies';
import { validateVoucher } from 'src/store/reducers/voucher';

import { IMoviePlayerProps, IMoviePlayerState } from './interfaces';

import './MoviePlayer.scss';

class MoviePlayer extends React.Component<IMoviePlayerProps, IMoviePlayerState> {

  public state: IMoviePlayerState = {
    isValid: false,
    verificationSkipped: false,
    isLoading: true,
    voucher: '',
  }

  public handleVoucherInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      voucher: event.target.value,
    })
  }

  public handleSVoucherVerifySubmit = (event) => {
    this.props.validateVoucher(this.state.voucher)
      .then(async () => {
        if (!this.props.isVoucherValid) {
          await this.props.fetchMovieDetails(this.props.match.params.id, this.state.voucher);
        }

        this.setState({
          isValid: true,
          isLoading: false,
        })
      })
      .catch(() => {
        alert('voucher is invalid');
      })
  };

  public handleSkipVoucherVerify = () => {
    this.setState({
      verificationSkipped: true,
      isLoading: false
    });
  }

  public async componentDidMount() {
    const { voucher, validateVoucher: validate, match } = this.props;
    
    validate(voucher)
      .then(async () => {
        if (this.props.isVoucherValid) {
          await this.props.fetchMovieDetails(match.params.id, voucher);
        }
        
        this.setState({
          isLoading: false,
          isValid: true,
        });
      })
      .catch((err) => {
        this.setState({
          isLoading: false
        });
      });
  }

  public render() {
    if (this.state.isLoading) {
      return (<Spinner />)
    }

    const movieDetail = Object.keys(this.props.movieDetails).length
      ? this.props.movieDetails
      : this.props.movies.find(({ id }) => id === this.props.match.params.id)
    
    if (!this.props.isVoucherValid && !this.state.verificationSkipped) {
      return (
        <div className="movieplayer-voucher">
          <div className="movieplayer-voucher-container">
            <input
              className="movieplayer-voucher-container__input"
              placeholder="Voucher"
              value={this.state.voucher}
              onChange={this.handleVoucherInputChange}
              />
            <div className="movieplayer-voucher-container__buttons">
              <div
                className="movieplayer-voucher-container__submit"
                onClick={this.handleSVoucherVerifySubmit}
              >Submit</div>
              <a
                href="https://netpap.co.ke/mobflix/milestone/msafiri"
                target="_blank"
                className="movieplayer-voucher-container__submit">
                Buy a voucher
              </a>
              <div
                className="movieplayer-voucher-container__submit"
                onClick={this.handleSkipVoucherVerify}
              >Skip</div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <>
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
            
            <Player
              playsInline={true}
              src={
                this.state.verificationSkipped
                  ? `${movieDetail!.base_url || 'http://127.0.0.1:8000'}${movieDetail!.trailer_url}`
                  : `${movieDetail!.base_url || 'http://127.0.0.1:8000'}${movieDetail!.video_url}`
              }
              className="movieplayer-player"
              fluid={false}
              height={250}
              poster={`${movieDetail!.base_url || 'http://127.0.0.1:8000'}${movieDetail!.poster}`}
            >
              <BigPlayButton position="center" />
            </Player>
            
            <div className="movieplayer-info">
              <div className="movieplayer-info__name">{ movieDetail!.name }</div>
              <div className="movieplayer-info__description">{ movieDetail!.description }</div>
              <div className="movieplayer-info__actors">Stars: { movieDetail!.stars }</div>
              <div className="movieplayer-info__actors">Genre: { movieDetail!.genre }</div>
            </div>
          </div>
        </>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  isVoucherValid: state.voucher.isValid,
  voucher: state.voucher.voucher,
  movieDetails: state.movie.movieDetails,
  movies: state.movies.data,
})

const mapDispatchToProps = (dispatch) => ({
  getMovies: () => dispatch(getMovies()),
  validateVoucher: (voucher) => dispatch(validateVoucher(voucher)),
  fetchMovieDetails: (id, voucher) => dispatch(fetchMovieDetails(id, voucher))
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviePlayer)