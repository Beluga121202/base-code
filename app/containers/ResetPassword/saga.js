import { call, put, takeLatest } from 'redux-saga/effects';

import * as constants from './constant';
import * as actions from './actions';
import { axiosPost } from '../../utils/request';

export function* handleReceiveEmail(action) {
  const path = '/auth/users/reset_password/';
  try {
    const res = yield call(axiosPost, path, action.body);
    if (res.status === 204) {
      yield put(actions.ReceiveEmailSuccess(res));
      if (action.callback) {
        action.callback(res);
      }
    }
  } catch (error) {
    yield put(actions.ReceiveEmailError(error));
  }
}
export function* handleChangePassword(action) {
  const path = '/auth/users/reset_password_confirm/';
  try {
    const res = yield call(axiosPost, path, action.body);
    if (res.status === 204) {
      yield put(actions.ResetPasswordSuccess(res));
      if (action.callback) {
        action.callback(res);
      }
    }
  } catch (error) {
    yield put(actions.ResetPasswordError(error));
  }
}

export default function* watchReceiveEmail() {
  yield takeLatest(constants.RECIEVEEMAILCHANGE, handleReceiveEmail);
  yield takeLatest(constants.RESETPASSWORD, handleChangePassword);
}
