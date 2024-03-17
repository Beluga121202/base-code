import { call, put, takeLatest } from 'redux-saga/effects';

import * as constants from './constants';
import * as actions from './actions';
import { axiosGet, axiosPost } from '../../../utils/request';

export function* handleTakeListOrder(action) {
  const path = '/order/';
  try {
    const res = yield call(axiosGet, path, action.body);
    if (res.status === 200) {
      yield put(actions.takeListOrderSuccess(res));
      if (action.callback) {
        action.callback(res);
      }
    }
  } catch (error) {
    yield put(actions.errorRequest(error));
  }
}
export function* handleTakeListOrderDetail(action) {
  const orderId = action.data;
  const path = `/order_detail/${orderId}`;
  try {
    const res = yield call(axiosPost, path, action.body);
    if (res.status === 200) {
      yield put(actions.takeListOrderDetailSuccess(res));
      if (action.callback) {
        action.callback(res);
      }
    }
  } catch (error) {
    yield put(actions.errorRequest(error));
  }
}
export function* handleChangeStatus(action) {
  const orderID = action.data.order_id;
  const path = `/change_status/${orderID}`;
  try {
    const res = yield call(axiosPost, path, action.data);
    if (res.status === 200) {
      yield put(actions.changeStatusSuccess(res));
      if (action.callback) {
        action.callback(res);
      }
    }
  } catch (error) {
    yield put(actions.errorRequest(error));
  }
}
export default function* watchTakeList() {
  yield takeLatest(constants.TAKEORDER, handleTakeListOrder);
  yield takeLatest(constants.TAKEORDER_DETAIL, handleTakeListOrderDetail);
  yield takeLatest(constants.CHANGESTATUS, handleChangeStatus);
}
