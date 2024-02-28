import { call, put, takeLatest } from 'redux-saga/effects';

import * as constants from './constants';
import * as actions from './actions';
import { axiosGet, axiosPost, axiosPut } from '../../../utils/request';

export function* handleTakeList(action) {
  const path = '/product/';
  try {
    const res = yield call(axiosGet, path, action.body);
    if (res.status === 200) {
      yield put(actions.takeListSuccess(res));
      if (action.callback) {
        action.callback(res);
      }
    }
  } catch (error) {
    yield put(actions.errorRequest(error));
  }
}
export function* handleAddInventory(action) {
  const path = `/inventory/`;
  try {
    const res = yield call(axiosPost, path, action.body);
    if (res.status === 201) {
      yield put(actions.addIventorySuccess(res));
      if (action.callback) {
        action.callback(res);
      }
    }
  } catch (error) {
    yield put(actions.errorRequest(error));
  }
}
export function* handleEditInventory(action) {
  const { id } = action.body;
  const path = `/inventory/${id}`;
  try {
    const res = yield call(axiosPut, path, action.body);
    if (res.status === 200) {
      yield put(actions.editIventorySuccess(res));
      if (action.callback) {
        action.callback(res);
      }
    }
  } catch (error) {
    yield put(actions.errorRequest(error));
  }
}
export function* handleDelete(action) {
  const { id } = action.body;
  const path = `/inventory/${id}`;
  try {
    const res = yield call(axiosPost, path, action.body);
    if (res.status === 200) {
      yield put(actions.deleteIventorySuccess(res));
      if (action.callback) {
        action.callback(res);
      }
    }
  } catch (error) {
    yield put(actions.errorRequest(error));
  }
}
export default function* watchTakeList() {
  yield takeLatest(constants.TAKELISTIVENTORY, handleTakeList);
  yield takeLatest(constants.ADDIVENTORY, handleAddInventory);
  yield takeLatest(constants.EDITIVENTORY, handleEditInventory);
  yield takeLatest(constants.DELETE, handleDelete);
}
