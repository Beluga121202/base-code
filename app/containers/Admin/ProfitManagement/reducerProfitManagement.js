import produce from 'immer';
import {
  TAKEDATA_MONTH,
  TAKEDATA_MONTH__SUCCESS,
  TAKEDATA_YEAR,
  TAKEDATA_YEAR__SUCCESS,
} from './constants';

export const initialState = {
  isLoading: false,
};
/* eslint-disable default-case, no-param-reassign */
export const ProfitManagementReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case TAKEDATA_MONTH:
        draft.isLoading = true;
        break;
      case TAKEDATA_MONTH__SUCCESS:
        draft.isLoading = false;
        break;
      case TAKEDATA_YEAR:
        draft.isLoading = true;
        break;
      case TAKEDATA_YEAR__SUCCESS:
        draft.isLoading = false;
        break;
    }
  });
export default ProfitManagementReducer;
