import produce from 'immer';
import {
  BANNER_PAGE,
  BANNER_PAGE_SUCCESS,
  FILTER_PRODUCT,
  FILTER_PRODUCT__ERROR,
  FILTER_PRODUCT__SUCCESS,
  TAKELIST_PAGE,
  TAKELIST_PAGE_ERROR,
  TAKELIST_PAGE_SUCCESS,
  TAKELIST_TRENDING_PAGE,
} from './constans';

export const initialState = {
  isLoading: false,
};
/* eslint-disable default-case, no-param-reassign */
const PageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case TAKELIST_PAGE:
        draft.isLoading = true;
        break;
      case TAKELIST_TRENDING_PAGE:
        draft.isLoading = true;
        break;
      case TAKELIST_PAGE_SUCCESS:
        draft.isLoading = false;
        break;
      case TAKELIST_PAGE_ERROR:
        draft.errorMessage = action.error;
        // console.log(action);
        break;
      case FILTER_PRODUCT:
        draft.isLoading = true;
        break;
      case FILTER_PRODUCT__SUCCESS:
        draft.isLoading = false;
        break;
      case FILTER_PRODUCT__ERROR:
        draft.errorMessage = action.error;
        // console.log(action);
        break;
      case BANNER_PAGE:
        draft.isLoading = true;
        break;
      case BANNER_PAGE_SUCCESS:
        draft.isLoading = false;
        break;
    }
  });

export default PageReducer;
