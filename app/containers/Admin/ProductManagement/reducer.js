import produce from 'immer';
import {
  ADDIVENTORY,
  ADDIVENTORYSSUCCESS,
  EDITIVENTORY,
  EDITIVENTORYSSUCCESS,
  TAKELISTIVENTORY,
  TAKELISTIVENTORYSUCCESS,
  DELETE,
  DELETESUCCESS,
} from './constants';

export const initialState = {
  isLoading: false,
  Inventory: {},
};
/* eslint-disable default-case, no-param-reassign */
export const takeListReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case TAKELISTIVENTORY:
        draft.isLoading = true;
        break;
      case TAKELISTIVENTORYSUCCESS:
        draft.isLoading = false;
        draft.Inventory = action.data.data;
        break;
      case ADDIVENTORY:
        draft.isLoading = true;
        break;
      case ADDIVENTORYSSUCCESS:
        draft.isLoading = false;
        break;
      case EDITIVENTORY:
        draft.isLoading = true;
        break;
      case EDITIVENTORYSSUCCESS:
        draft.isLoading = false;
        break;
      case DELETE:
        draft.isLoading = true;
        break;
      case DELETESUCCESS:
        draft.isLoading = false;
        break;
    }
  });
export default takeListReducer;
