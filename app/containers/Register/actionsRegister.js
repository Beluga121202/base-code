import {
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
} from './constantsRegister';

export function Register(body, callback) {
  return {
    type: REGISTER,
    body,
    callback,
  };
}

export function RegisterSuccess(data) {
  return {
    type: REGISTER_SUCCESS,
    data,
  };
}
export function RegisterError(error) {
  return {
    type: REGISTER_ERROR,
    error,
  };
}
