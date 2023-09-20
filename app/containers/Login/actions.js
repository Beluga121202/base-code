import { LOGIN, LOGIN_ERROR, LOGIN_SUCCESS } from './constant';

export function Login(body) {
  return {
    type: LOGIN,
    body,
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
