import { call, put, takeLatest } from 'redux-saga/effects';
import { axiosGet } from '../../utils/request';
import * as actions from '../DetailProduct/actionsDetailProduct';
import * as constants from '../DetailProduct/constants';
export function* handleTakeDetailProduct(action) {
  const path = `/shoes/${action.body}`;
  try {
    const res = yield call(axiosGet, path, action.body);
    if (res.status === 200) {
      yield put(actions.takeDetailProductSuccess(res));
      if (action.callback) {
        action.callback(res);
      }
    }
  } catch (error) {
    yield put(actions.takeDetailProductError(error));
  }
}
export default function* watchTakeDetailProduct() {
  yield takeLatest(constants.TAKE_DETAIL_PRODUCT, handleTakeDetailProduct);
}
