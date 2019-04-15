import * as React from 'react';

import IconButton from '@material-ui/core/IconButton';
import BackIcon from '@material-ui/icons/ArrowBackRounded';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Spinner from 'src/components/Spinner';
import { getMovies } from 'src/store/reducers/movies';
import { fetchMovieDetails } from 'src/store/reducers/movie';
import { validateVoucher } from 'src/store/reducers/voucher';

import { IMoviePlayerProps, IMoviePlayerState } from './interfaces';

import './MoviePlayer.scss';

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
      category: {
        name: '',
        id: ''
      }
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
        if (!this.props.isVoucherValid) {
          await this.props.fetchMovieDetails(this.props.match.params.id, this.state.voucher);
        }

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
          if (!this.props.isVoucherValid) {
            await this.props.fetchMovieDetails(match.params.id, voucher);
          }
          
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
    } else if (this.props.isVoucherValid) {
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
            <a
              href="https://netpap.co.ke/mobflix/milestone/msafiri"
              target="_blank"
              className="movieplayer-voucher-container__submit">
              Buy a voucher
            </a>
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
                    url={this.props.movieDetails.video_url ? `http://localhost${this.props.movieDetails.video_url}` : 'https://www.youtube.com/watch?v=ysz5S6PUM-U'}
                    playing={false}
                    className="movieplayer-player"
                    controls={true}
                    />
                  
                  <div className="movieplayer-info">
                    <div className="movieplayer-info__name">{ this.state.movie.name }</div>
                    <div className="movieplayer-info__description">{ this.state.movie.description }</div>
                    <div className="movieplayer-info__actors">Stars: { this.state.movie.stars }</div>
                    <div className="movieplayer-info__actors">Genre: { this.state.movie.genre }</div>
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