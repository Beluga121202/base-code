import { call, put, takeLatest } from 'redux-saga/effects';

import * as constants from './constants';
import * as actions from './actions';
import { axiosPost } from '../../utils/request';

export function* handleLogin(action) {
  const path = '/auth/jwt/create/';
  try {
    const res = yield call(axiosPost, path, action.body);
    if (res.status === 200) {
      yield put(actions.LoginSuccess(res));
      if (action.callback) {
        action.callback(res.data);
      }
    }
  } catch (error) {
    yield put(actions.LoginError(error));
  }
}

export default function* watchLogin() {
  yield takeLatest(constants.LOGIN, handleLogin);
}
