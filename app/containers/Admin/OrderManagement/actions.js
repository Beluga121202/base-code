import {
  CHANGESTATUS,
  CHANGESTATUS__SUCCESS,
  TAKEORDER,
  TAKEORDER__SUCCESS,
  TAKEORDER_DETAIL,
  TAKEORDER_DETAIL__SUCCESS,
} from './constants';
import { ERRORREQUEST } from '../ProductManagement/constants';

export function takeListOrder(data, callback) {
  return {
    type: TAKEORDER,
    data,
    callback,
  };
}
export function takeListOrderSuccess(data) {
  return {
    type: TAKEORDER__SUCCESS,
    data,
  };
}
export function takeListOrderDetail(data, callback) {
  return {
    type: TAKEORDER_DETAIL,
    data,
    callback,
  };
}
export function takeListOrderDetailSuccess(data) {
  return {
    type: TAKEORDER_DETAIL__SUCCESS,
    data,
  };
}
export function changeStatus(data, callback) {
  return {
    type: CHANGESTATUS,
    data,
    callback,
  };
}
export function changeStatusSuccess(data) {
  return {
    type: CHANGESTATUS__SUCCESS,
    data,
  };
}
export function errorRequest(error) {
  return {
    type: ERRORREQUEST,
    error,
  };
}
