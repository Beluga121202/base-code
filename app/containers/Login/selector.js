import { createSelector } from 'reselect';
import { REDUX_KEY } from '../../utils/constants';
import { initialState } from './reducer';

export const selecLogin = state => state[REDUX_KEY.login] || initialState;

export const selectUserLogin = () => {
  createSelector(
    selecLogin,
    state => state.userAccount,
  );
};
