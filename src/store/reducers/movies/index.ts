import { Movie } from 'src/pages/MovieList/interfaces';
import { http } from 'src/Utils/axios-helpers';

import { MovieActions } from './types';

export const getMoviesSuccess = (movies: Movie[]) => ({ movies, type: MovieActions.getMoviesSuccess });

export const getMovies = () => (dispatch) => {
  return http
          .get('content/all/')
          .then((resp) => {
            dispatch(getMoviesSuccess(resp.data));
          })
          .catch((error) => console.log('>>>>>>', error.message));
};

export default (state = { data: [] }, action) => {
  switch (action.type) {
   case MovieActions.getMoviesSuccess:
    return {
      ...state,
     data: [...action.movies]
    }
   default:
    return state
  }
 }
