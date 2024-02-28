import { call, put, takeLatest } from 'redux-saga/effects';

import * as constants from './constant';
import * as actions from './actions';
import { axiosPost } from '../../utils/request';

export function* handleActivate(action) {
  const path = '/auth/users/activation/';
  try {
    const res = yield call(axiosPost, path, action.body);
    if (res.status === 204) {
      yield put(actions.ActivateSuccess(res));
      if (action.callback) {
        action.callback(res);
      }
    }
  } catch (error) {
    yield put(actions.ActivateError(error));
  }
}

export default function* watchActivate() {
  yield takeLatest(constants.ACTIVATE, handleActivate);
}
