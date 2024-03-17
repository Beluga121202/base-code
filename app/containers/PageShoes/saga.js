import { call, put, takeLatest } from 'redux-saga/effects';
import { axiosGet } from '../../utils/request';
import * as actions from './actions';
import * as constants from './constans';

export function* handleTakeListPage(action) {
  const gender = action.body;
  let path = `/page/?product_type=${gender[0]}`;
  if (gender.length >= 2) {
    path += `&product_type=${gender[1]}`;
  }
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
  const { product, toPrice, ordering, gender } = action.body;
  console.log(action.body);
  let path = '/page/?';

  if (product && product.length > 0) {
    path += product.map(item => `product_line=${item}&`).join('');
  }
  if (gender && gender.length > 0) {
    path += gender.map(item => `product_type=${item}&`).join('');
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
export function* handleTakeBanner(action) {
  const path = `/banner/?title=${action.body}`;
  try {
    const res = yield call(axiosGet, path, action.body);
    if (res.status === 200) {
      yield put(actions.takeBannerSuccess(res));
      if (action.callback) {
        action.callback(res);
      }
    }
  } catch (error) {
    yield put(actions.takeListError(error));
  }
}
export function* handleTakeListTrendingPage(action) {
  const path = `/page/?product_line=${action.body}&product_type=Unisex`;
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
export default function* watchTakeList() {
  yield takeLatest(constants.TAKELIST_PAGE, handleTakeListPage);
  yield takeLatest(constants.FILTER_PRODUCT, handleFilterProduct);
  yield takeLatest(constants.BANNER_PAGE, handleTakeBanner);
  yield takeLatest(
    constants.TAKELIST_TRENDING_PAGE,
    handleTakeListTrendingPage,
  );
}
