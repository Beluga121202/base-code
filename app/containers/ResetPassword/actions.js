import {
  RECIEVEEMAILCHANGE,
  RECIEVEEMAILCHANGE_SUCCESS,
  RECIEVEEMAILCHANGE_ERROR,
  RESETPASSWORD,
  RESETPASSWORD_SUCCESS,
  RESETPASSWORD_ERROR,
} from './constant';

export function ReceiveEmail(body, callback) {
  return {
    type: RECIEVEEMAILCHANGE,
    body,
    callback,
  };
}

export function ReceiveEmailSuccess(data) {
  return {
    type: RECIEVEEMAILCHANGE_SUCCESS,
    data,
  };
}
export function ReceiveEmailError(error) {
  return {
    type: RECIEVEEMAILCHANGE_ERROR,
    error,
  };
}
export function ResetPassword(body, callback) {
  return {
    type: RESETPASSWORD,
    body,
    callback,
  };
}

export function ResetPasswordSuccess(data) {
  return {
    type: RESETPASSWORD_SUCCESS,
    data,
  };
}
export function ResetPasswordError(error) {
  return {
    type: RESETPASSWORD_ERROR,
    error,
  };
}
