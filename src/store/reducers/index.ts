import { combineReducers } from 'redux';

import movies from 'src/store/reducers/movies';
import voucher from 'src/store/reducers/voucher';
import movie from 'src/store/reducers/movie';

export default combineReducers({
  movies,
  voucher,
  movie
});