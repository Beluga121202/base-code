import produce from 'immer';
import { DECRESE_QUANTITY, INCRESE_QUANTITY, TAKE_ITEM } from './constatns';
import { DELETE_ITEM } from '../App/constants';

export const initialState = {
  isLoading: false,
  cartItem: JSON.parse(localStorage.getItem('cart')),
};
/* eslint-disable default-case, no-param-reassign */
const CartReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case TAKE_ITEM:
        draft.isLoading = true;
        draft.cartItem = JSON.parse(localStorage.getItem('cart'));
        break;
      case INCRESE_QUANTITY: {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        const isProductExists = storedCart.some(
          item => item.product_id === action.body.product_id,
        );
        let updatedCart;
        if (isProductExists) {
          updatedCart = storedCart.map(item => {
            if (item.product_id === action.body.product_id) {
              return {
                ...item,
                quantity: item.quantity + 1,
              };
            }
            return item;
          });
        }
        draft.cartItem = updatedCart;
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        break;
      }
      case DECRESE_QUANTITY: {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        const isProductExists = storedCart.some(
          item => item.product_id === action.body.product_id,
        );
        let updatedCart;
        if (isProductExists) {
          updatedCart = storedCart.map(item => {
            if (item.product_id === action.body.product_id) {
              return {
                ...item,
                quantity: item.quantity > 1 ? item.quantity - 1 : 1,
              };
            }
            return item;
          });
        }
        draft.cartItem = updatedCart;
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        break;
      }
      case DELETE_ITEM: {
        const storedCart = JSON.parse(localStorage.getItem('cart'));
        const updatedCart = storedCart.filter(
          item => item.product_id !== action.body.product_id,
        );
        draft.cartItem = updatedCart;
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        break;
      }
    }
  });

export default CartReducer;
