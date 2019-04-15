import { http } from 'src/Utils/axios-helpers';

import { MovieDetailsAction } from './types';

const fetchMovieDetailsSuccessAction = (movie: any) => ({ movie, type: MovieDetailsAction.FetchSuccess});

const fetchMovieDetailsFailureAction = (message: string) => ({ message, type: MovieDetailsAction.FetchFailure});

export const fetchMovieDetails = (id, voucher) => (dispatch) => {
  return http
    .get(`/content/item/${id}/${voucher}/`)
    .then((resp) => {
      dispatch(fetchMovieDetailsSuccessAction(resp.data));
    })
    .catch((error) => {
      dispatch(fetchMovieDetailsFailureAction(error.message));
    });
};

export default (state = { movieDetails: {}, message: '' }, action) => {
  switch (action.type) {
    case MovieDetailsAction.FetchSuccess:
      return {
        ...state,
        movieDetails: action.movie.response,
        message: action.movie.status.message
      }
    case MovieDetailsAction.FetchFailure:
      return {
        ...state,
        message: action.message
      }
    default:
      return state
  }
}
