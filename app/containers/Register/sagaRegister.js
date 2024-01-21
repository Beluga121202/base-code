import { call, put, takeLatest } from 'redux-saga/effects';

import * as constants from './constantsRegister';
import * as actions from './actionsRegister';
import { axiosPost } from '../../utils/request';

export function* handleRegister(action) {
  const path = '/auth/users/';
  try {
    const res = yield call(axiosPost, path, action.body);
    if (res.status === 201) {
      yield put(actions.RegisterSuccess(res));
      if (action.callback) {
        action.callback(res.data);
      }
    }
  } catch (error) {
    yield put(actions.RegisterError(error));
  }
}

export default function* watchRegister() {
  yield takeLatest(constants.REGISTER, handleRegister);
}
