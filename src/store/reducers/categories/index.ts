import { http } from 'src/Utils/axios-helpers';

import { CategoryAction } from './types';

const fetchMovieDetailsSuccessAction = (categories: any) => ({ categories, type: CategoryAction.FetchCategorySuccess});

const fetchMovieDetailsFailureAction = (message: string) => ({ message, type: CategoryAction.FetchCategoryFailure});

export const fetchCategories = () => (dispatch) => {
  return http
    .get(`/admin/category/list/`)
    .then((resp) => {
      dispatch(fetchMovieDetailsSuccessAction(resp.data));
    })
    .catch((error) => {
      dispatch(fetchMovieDetailsFailureAction(error.message));
    });
};

export default (state = { data: [], message: '' }, action) => {
  switch (action.type) {
    case CategoryAction.FetchCategorySuccess:
      return {
        ...state,
        data: action.categories,
      }
    case CategoryAction.FetchCategoryFailure:
      return {
        ...state,
        message: action.message
      }
    default:
      return state
  }
}
