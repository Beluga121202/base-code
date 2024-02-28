import produce from 'immer';
import { ACTIVATE, ACTIVATE_ERROR, ACTIVATE_SUCCESS } from './constant';

export const initialState = {
  isLoading: false,
  errorMessage: null,
};
/* eslint-disable default-case, no-param-reassign */
const ActivateReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ACTIVATE:
        draft.isLoading = true;
        break;
      case ACTIVATE_SUCCESS:
        draft.isLoading = false;
        break;
      case ACTIVATE_ERROR:
        draft.errorMessage = action.error;
        // console.log(action);
        break;
    }
  });

export default ActivateReducer;
