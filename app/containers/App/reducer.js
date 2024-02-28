import produce from 'immer';
import { LOG_OUT, LOGIN, LOGIN_ERROR, LOGIN_SUCCESS } from './constants';

export const initialState = {
  isLoading: false,
  userAccount: JSON.parse(localStorage.getItem('user')) || [],
};
/* eslint-disable default-case, no-param-reassign */
const LoginReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN:
        draft.isLoading = true;
        break;
      case LOGIN_SUCCESS:
        draft.isLoading = false;
        draft.userAccount = action.data.data;
        localStorage.setItem(
          'user',
          JSON.stringify({
            id: action.data.data.id,
            username: action.data.data.username,
            is_staff: action.data.data.is_staff,
            access_token: action.data.data.access,
          }),
        );
        break;
      case LOGIN_ERROR:
        break;
      case LOG_OUT:
        draft.userAccount = [];
        localStorage.setItem('user', JSON.stringify([]));
    }
  });

export default LoginReducer;
