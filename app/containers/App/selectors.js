import { createSelector } from 'reselect';
import { REDUX_KEY } from '../../utils/constants';
import { initialState } from './reducer';

export const selectLogin = state => state[REDUX_KEY.login] || initialState;

export const selectUserLogin = () =>
  createSelector(
    selectLogin,
    state => state.userAccount,
  );

export const selectCart = () =>
  createSelector(
    selectLogin,
    state => state.cart,
  );
