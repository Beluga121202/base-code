import { createSelector } from 'reselect';
import { REDUX_KEY } from '../../utils/constants';
import { initialState } from './reducerRegister';

export const selectCart = state => state[REDUX_KEY.register] || initialState;

export const selectLoading = () =>
  createSelector(
    selectCart,
    state => state.isLoading,
  );
