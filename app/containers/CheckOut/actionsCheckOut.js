import { CHECKOUT, CHECKOUT__ERROR, CHECKOUT__SUCCESS } from './constants';

export function CheckOut(body, callback) {
  return {
    type: CHECKOUT,
    body,
    callback,
  };
}
export function CheckOutSuccess(data) {
  return {
    type: CHECKOUT__SUCCESS,
    data,
  };
}
export function CheckOutError(data) {
  return {
    type: CHECKOUT__ERROR,
    data,
  };
}
