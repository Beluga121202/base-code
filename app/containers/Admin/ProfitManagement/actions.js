import {
  ERROR_REQUEST,
  TAKEDATA_MONTH,
  TAKEDATA_MONTH__SUCCESS,
  TAKEDATA_YEAR,
  TAKEDATA_YEAR__SUCCESS,
} from './constants';

export function takeDataMonth(data, callback) {
  return {
    type: TAKEDATA_MONTH,
    data,
    callback,
  };
}
export function takeDataMonthSuccess(data) {
  return {
    type: TAKEDATA_MONTH__SUCCESS,
    data,
  };
}
export function takeDataYear(data, callback) {
  return {
    type: TAKEDATA_YEAR,
    data,
    callback,
  };
}
export function takeDataYearSuccess(data) {
  return {
    type: TAKEDATA_YEAR__SUCCESS,
    data,
  };
}
export function errorRequest(error) {
  return {
    type: ERROR_REQUEST,
    error,
  };
}
