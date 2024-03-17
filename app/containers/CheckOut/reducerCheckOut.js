import produce from 'immer';
import { CHECKOUT, CHECKOUT__SUCCESS } from './constants';

export const initialState = {
  isLoading: false,
};
/* eslint-disable default-case, no-param-reassign */
const CheckOutReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHECKOUT:
        draft.isLoading = true;
        break;
      case CHECKOUT__SUCCESS:
        draft.isLoading = false;
        break;
    }
  });

export default CheckOutReducer;
