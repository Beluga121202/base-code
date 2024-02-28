import produce from 'immer';
import {
  FILTER_PRODUCT,
  FILTER_PRODUCT__ERROR,
  FILTER_PRODUCT__SUCCESS,
  TAKELIST_MENPAGE,
  TAKELIST_MENPAGE_ERROR,
  TAKELIST_MENPAGE_SUCCESS,
} from './constans';

export const initialState = {
  isLoading: false,
};
/* eslint-disable default-case, no-param-reassign */
const MenPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case TAKELIST_MENPAGE:
        draft.isLoading = true;
        break;
      case TAKELIST_MENPAGE_SUCCESS:
        draft.isLoading = false;
        break;
      case TAKELIST_MENPAGE_ERROR:
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
    }
  });

export default MenPageReducer;
