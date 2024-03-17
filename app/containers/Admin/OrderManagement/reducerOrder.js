import produce from 'immer';
import { TAKEORDER, TAKEORDER__SUCCESS } from './constants';

export const initialState = {
  isLoading: false,
  Inventory: {},
};
/* eslint-disable default-case, no-param-reassign */
export const OrderManagementReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case TAKEORDER:
        draft.isLoading = true;
        break;
      case TAKEORDER__SUCCESS:
        draft.isLoading = false;
        break;
    }
  });
export default OrderManagementReducer;
