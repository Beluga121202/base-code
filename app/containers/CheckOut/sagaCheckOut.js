import { call, put, takeLatest } from 'redux-saga/effects';
import { axiosPost } from '../../utils/request';
import * as actions from './actionsCheckOut';
import * as constants from './constants';
export function* handleCheckOut(action) {
  const path = `/checkout/`;
  try {
    const res = yield call(axiosPost, path, action.body);
    if (res.status === 200) {
      yield put(actions.CheckOutSuccess(res));
      if (action.callback) {
        action.callback(res);
      }
    }
  } catch (error) {
    yield put(actions.CheckOutError(error));
  }
}
export default function* watchTakeDetailProduct() {
  yield takeLatest(constants.CHECKOUT, handleCheckOut);
}
