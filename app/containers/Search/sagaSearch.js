import { call, put, takeLatest } from 'redux-saga/effects';
import { axiosGet } from '../../utils/request';
import * as actions from './actionsSearch';
import * as constants from './constatns';

export function* handleTakeListSearchPage(action) {
  const search = action.body;
  const path = `/page/?search=${search}`;
  try {
    const res = yield call(axiosGet, path, action.body);
    if (res.status === 200) {
      yield put(actions.takeListSearchPageSuccess(res));
      if (action.callback) {
        action.callback(res);
      }
    }
  } catch (error) {
    yield put(actions.takeListSearchPageError(error));
  }
}
export default function* watchTakeList() {
  yield takeLatest(constants.TAKE_LIST_SEARCH, handleTakeListSearchPage);
}
