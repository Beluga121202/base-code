import produce from 'immer';
import { TAKELIST_CUSTOMER, TAKELIST_CUSTOMER__SUCCESS } from './constants';

export const initialState = {
  isLoading: false,
};
/* eslint-disable default-case, no-param-reassign */
export const CustomerManagementReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case TAKELIST_CUSTOMER:
        draft.isLoading = true;
        break;
      case TAKELIST_CUSTOMER__SUCCESS:
        draft.isLoading = false;
        break;
    }
  });
export default CustomerManagementReducer;
