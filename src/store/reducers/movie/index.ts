import { http } from 'src/Utils/axios-helpers';

import { MovieDetails } from './types';

const fetchMovieDetailsSuccessAction = (movie: any) => ({ movie, type: MovieDetails.FetchSuccess});

const fetchMovieDetailsFailureAction = (message: string) => ({ message, type: MovieDetails.FetchFailure});

export const fetchMovieDetails = (id, voucher) => (dispatch) => {
  return http
    .get(`/content/item/${id}/${voucher}/`)
    .then((resp) => {
      dispatch(fetchMovieDetailsSuccessAction(resp.data));
    })
    .catch((error) => {
      console.log('>>>>>>', error.message);
      dispatch(fetchMovieDetailsFailureAction(error.message));
    });
};

export default (state = { movieDetails: {}, message: '' }, action) => {
  switch (action.type) {
    case MovieDetails.FetchSuccess:
      return {
        ...state,
        movieDetails: action.movie.response,
        message: action.movie.status.message
      }
    case MovieDetails.FetchFailure:
      return {
        ...state,
        message: action.message
      }
    default:
      return state
  }
}
