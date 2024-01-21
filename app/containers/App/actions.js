import { LOG_OUT, LOGIN, LOGIN_ERROR, LOGIN_SUCCESS } from './constants';

export function Login(body, callback) {
  return {
    type: LOGIN,
    body,
    callback,
  };
}

export function LoginSuccess(data) {
  return {
    type: LOGIN_SUCCESS,
    data,
  };
}
export function LoginError(error) {
  return {
    type: LOGIN_ERROR,
    error,
  };
}
export function LogOut(data) {
  return {
    type: LOG_OUT,
    data,
  };
}
