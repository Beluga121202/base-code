import { createSelector } from 'reselect';
import { REDUX_KEY } from '../../utils/constants';
import { initialState } from './reducer';

export const selecResetPassWord = state =>
  state[REDUX_KEY.resetPassword] || initialState;

export const selectLoading = () =>
  createSelector(
    selecResetPassWord,
    state => state.isLoading,
  );
