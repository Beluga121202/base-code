import produce from 'immer';
import {
  TAKE_LIST_SEARCH,
  TAKE_LIST_SEARCH__ERROR,
  TAKE_LIST_SEARCH__SUCCESS,
} from './constatns';

export const initialState = {
  isLoading: false,
};
/* eslint-disable default-case, no-param-reassign */
const SearchReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case TAKE_LIST_SEARCH:
        draft.isLoading = true;
        break;
      case TAKE_LIST_SEARCH__SUCCESS:
        draft.isLoading = true;
        break;
      case TAKE_LIST_SEARCH__ERROR:
        draft.isLoading = false;
        break;
    }
  });

export default SearchReducer;
