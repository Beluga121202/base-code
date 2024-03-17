import {
  DELETE_CUSTOMER,
  DELETE_CUSTOMER__SUCCESS,
  EDIT_CUSTOMER,
  EDIT_CUSTOMER__SUCCESS,
  TAKELIST_CUSTOMER,
  TAKELIST_CUSTOMER__SUCCESS,
} from './constants';
import { ERRORREQUEST } from '../ProductManagement/constants';

export function takeListCustomer(body, callback) {
  return {
    type: TAKELIST_CUSTOMER,
    body,
    callback,
  };
}
export function takeListCustomerSuccess(data) {
  return {
    type: TAKELIST_CUSTOMER__SUCCESS,
    data,
  };
}
export function editCustomer(body, callback) {
  return {
    type: EDIT_CUSTOMER,
    body,
    callback,
  };
}
export function editCustomerSuccess(data) {
  return {
    type: EDIT_CUSTOMER__SUCCESS,
    data,
  };
}
export function deleteCustomer(body, callback) {
  return {
    type: DELETE_CUSTOMER,
    body,
    callback,
  };
}

export function deleteCustomerSuccess(data) {
  return {
    type: DELETE_CUSTOMER__SUCCESS,
    data,
  };
}
export function errorRequest(error) {
  return {
    type: ERRORREQUEST,
    error,
  };
}
