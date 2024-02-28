import produce from 'immer';
import {
  RECIEVEEMAILCHANGE,
  RECIEVEEMAILCHANGE_SUCCESS,
  RECIEVEEMAILCHANGE_ERROR,
  RESETPASSWORD,
  RESETPASSWORD_SUCCESS,
  RESETPASSWORD_ERROR,
} from './constant';

export const initialState = {
  isLoading: false,
  errorMessage: null,
};
/* eslint-disable default-case, no-param-reassign */
const ReceiveEmailReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case RECIEVEEMAILCHANGE:
        draft.isLoading = true;
        break;
      case RECIEVEEMAILCHANGE_SUCCESS:
        draft.isLoading = false;
        break;
      case RECIEVEEMAILCHANGE_ERROR:
        draft.errorMessage = action.error;
        // console.log(action);
        break;
      case RESETPASSWORD:
        draft.isLoading = true;
        break;
      case RESETPASSWORD_SUCCESS:
        draft.isLoading = false;
        break;
      case RESETPASSWORD_ERROR:
        draft.errorMessage = action.error;
        // console.log(action);
        break;
    }
  });

export default ReceiveEmailReducer;
