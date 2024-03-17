import {
  ADD_TO_CART,
  TAKE_DETAIL_PRODUCT,
  TAKE_DETAIL_PRODUCT_ERROR,
  TAKE_DETAIL_PRODUCT_SUCCESS,
} from './constants';

export function takeDetailProduct(body, callback) {
  return {
    type: TAKE_DETAIL_PRODUCT,
    body,
    callback,
  };
}
export function takeDetailProductSuccess(data) {
  return {
    type: TAKE_DETAIL_PRODUCT_SUCCESS,
    data,
  };
}
export function takeDetailProductError(data) {
  return {
    type: TAKE_DETAIL_PRODUCT_ERROR,
    data,
  };
}

export function AddToCart(body) {
  return {
    type: ADD_TO_CART,
    body,
  };
}
