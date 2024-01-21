import produce from 'immer';
import {
  REGISTER,
  REGISTER_ERROR,
  REGISTER_SUCCESS,
} from './constantsRegister';

export const initialState = {
  isLoading: false,
};
/* eslint-disable default-case, no-param-reassign */
const RegisterReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case REGISTER:
        draft.isLoading = true;
        break;
      case REGISTER_SUCCESS:
        draft.isLoading = false;
        break;
      case REGISTER_ERROR:
        draft.errorMessage = action.error;
        // console.log(action);
        break;
    }
  });

export default RegisterReducer;
