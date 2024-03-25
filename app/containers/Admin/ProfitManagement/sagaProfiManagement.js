import { call, put, takeLatest } from 'redux-saga/effects';
import { axiosGet } from '../../../utils/request';
import * as actions from './actions';
import * as constants from './constants';
export function* handleTakeDataMonth(action) {
  const path = '/profit_by_year/';
  try {
    const res = yield call(axiosGet, path, action.body);
    if (res.status === 200) {
      yield put(actions.takeDataMonthSuccess(res));
      if (action.callback) {
        action.callback(res);
      }
    }
  } catch (error) {
    yield put(actions.errorRequest(error));
  }
}
export function* handleTakeDataYear(action) {
  const path = '/profit_for_years/';
  try {
    const res = yield call(axiosGet, path, action.body);
    if (res.status === 200) {
      yield put(actions.takeDataYearSuccess(res));
      if (action.callback) {
        action.callback(res);
      }
    }
  } catch (error) {
    yield put(actions.errorRequest(error));
  }
}
export default function* watchTakeList() {
  yield takeLatest(constants.TAKEDATA_MONTH, handleTakeDataMonth);
  yield takeLatest(constants.TAKEDATA_YEAR, handleTakeDataYear);
}
