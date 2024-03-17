import { call, put, takeLatest } from 'redux-saga/effects';
import { axiosGet, axiosPost, axiosPut } from '../../../utils/request';
import * as actions from './actions';
import * as constants from './constants';
export function* handleTakeListCustomer(action) {
  const path = '/customer/';
  try {
    const res = yield call(axiosGet, path, action.body);
    if (res.status === 200) {
      yield put(actions.takeListCustomerSuccess(res));
      if (action.callback) {
        action.callback(res);
      }
    }
  } catch (error) {
    yield put(actions.errorRequest(error));
  }
}
export function* handleEditCustomer(action) {
  const { username } = action.body;
  const path = `/customer_edit/${username}`;
  try {
    const res = yield call(axiosPut, path, action.body);
    if (res.status === 200) {
      yield put(actions.editCustomerSuccess(res));
      if (action.callback) {
        action.callback(res);
      }
    }
  } catch (error) {
    yield put(actions.errorRequest(error));
  }
}
export function* handleDeleteCustomer(action) {
  const { username } = action.body;
  const path = `/customer_edit/${username}`;
  try {
    const res = yield call(axiosPost, path, action.body);
    if (res.status === 200) {
      yield put(actions.deleteCustomerSuccess(res));
      if (action.callback) {
        action.callback(res);
      }
    }
  } catch (error) {
    yield put(actions.errorRequest(error));
  }
}
export default function* watchTakeList() {
  yield takeLatest(constants.TAKELIST_CUSTOMER, handleTakeListCustomer);
  yield takeLatest(constants.EDIT_CUSTOMER, handleEditCustomer);
  yield takeLatest(constants.DELETE_CUSTOMER, handleDeleteCustomer);
}
