import { ACTIVATE, ACTIVATE_SUCCESS, ACTIVATE_ERROR } from './constant';

export function Activate(body, callback) {
  return {
    type: ACTIVATE,
    body,
    callback,
  };
}

export function ActivateSuccess(data) {
  return {
    type: ACTIVATE_SUCCESS,
    data,
  };
}
export function ActivateError(error) {
  return {
    type: ACTIVATE_ERROR,
    error,
  };
}
