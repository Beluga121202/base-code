import { call, put, takeLatest } from 'redux-saga/effects';
import { axiosGet } from '../../utils/request';
import * as actions from './actions';
import * as constants from './constans';

export function* handleTakeListMenPage(action) {
  const path = `/page/?product_type=${action.body}`;
  try {
    const res = yield call(axiosGet, path, action.body);
    if (res.status === 200) {
      yield put(actions.takeListSuccess(res));
      if (action.callback) {
        action.callback(res);
      }
    }
  } catch (error) {
    yield put(actions.takeListError(error));
  }
}
export function* handleFilterProduct(action) {
  console.log(action.body);
  const { product, toPrice, ordering } = action.body;
  let path = '/page/?';

  if (product && product.length > 0) {
    path += product.map(item => `product_line=${item}&`).join('');
  }

  if (toPrice && toPrice.length > 0) {
    path += toPrice.map(price => `to_price=${price}&`).join('');
  }
  if (ordering !== 'default') {
    path += `ordering=${ordering}&`;
  }

  // Remove the last '&' character from the path
  path = path.slice(0, -1);

  try {
    const res = yield call(axiosGet, path, action.body);
    if (res.status === 200) {
      yield put(actions.filterProdcutSuccess(res));
      if (action.callback) {
        action.callback(res);
      }
    }
  } catch (error) {
    yield put(actions.filterProdcutError(error));
  }
}

export default function* watchTakeList() {
  yield takeLatest(constants.TAKELIST_MENPAGE, handleTakeListMenPage);
  yield takeLatest(constants.FILTER_PRODUCT, handleFilterProduct);
}
