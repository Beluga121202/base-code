import produce from 'immer';
import {
  ADD_TO_CART,
  TAKE_DETAIL_PRODUCT,
  TAKE_DETAIL_PRODUCT_ERROR,
  TAKE_DETAIL_PRODUCT_SUCCESS,
} from './constants';

export const initialState = {
  isLoading: false,
  cart: JSON.parse(localStorage.getItem('cart')),
};
/* eslint-disable default-case, no-param-reassign */
const DetailProductReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case TAKE_DETAIL_PRODUCT:
        draft.isLoading = true;
        break;
      case TAKE_DETAIL_PRODUCT_SUCCESS:
        draft.isLoading = false;
        break;
      case TAKE_DETAIL_PRODUCT_ERROR:
        draft.errorMessage = action.error;
        // console.log(action);
        break;
      case ADD_TO_CART: {
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
                quantity: item.quantity + action.body.quantity,
              };
            }
            return item;
          });
        } else {
          updatedCart = [...storedCart, action.body];
        }
        draft.cart = updatedCart;
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        break;
      }
    }
  });

export default DetailProductReducer;
