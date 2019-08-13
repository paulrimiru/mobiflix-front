import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import categories from 'src/store/reducers/categories';
import movie from 'src/store/reducers/movie';
import movies from 'src/store/reducers/movies';
import voucher from 'src/store/reducers/voucher';

const voucherPersistConfig = {
  key: 'voucher',
  storage
}

export default combineReducers({
  movies,
  voucher: persistReducer(voucherPersistConfig, voucher),
  movie,
  categories,
});