import {
  DECRESE_QUANTITY,
  DELETE_ITEM,
  INCRESE_QUANTITY,
  TAKE_ITEM,
} from './constatns';

export function IncreseQuantity(body) {
  return {
    type: INCRESE_QUANTITY,
    body,
  };
}
export function DecreseQuantity(body) {
  return {
    type: DECRESE_QUANTITY,
    body,
  };
}
export function DeleteItem(body) {
  return {
    type: DELETE_ITEM,
    body,
  };
}
export function TakeList(body) {
  return {
    type: TAKE_ITEM,
    body,
  };
}
