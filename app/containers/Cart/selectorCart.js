import { createSelector } from 'reselect';
import { REDUX_KEY } from '../../utils/constants';
import { initialState } from './reducerCart';

export const selectCart = state => state[REDUX_KEY.cart] || initialState;

export const selectCartItem = () =>
  createSelector(
    selectCart,
    state => state.cartItem,
  );
