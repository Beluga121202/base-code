import {
  TAKELISTIVENTORY,
  TAKELISTIVENTORYSUCCESS,
  ADDIVENTORYSSUCCESS,
  ADDIVENTORY,
  EDITIVENTORY,
  EDITIVENTORYSSUCCESS,
  ERRORREQUEST,
  DELETE,
  DELETESUCCESS,
} from './constants';

export function takeListIventory(data, callback) {
  return {
    type: TAKELISTIVENTORY,
    data,
    callback,
  };
}
export function takeListSuccess(data) {
  return {
    type: TAKELISTIVENTORYSUCCESS,
    data,
  };
}

export function addIventory(body, callback) {
  return {
    type: ADDIVENTORY,
    body,
    callback,
  };
}
export function addIventorySuccess(data) {
  return {
    type: ADDIVENTORYSSUCCESS,
    data,
  };
}
export function editIventory(body, callback) {
  return {
    type: EDITIVENTORY,
    body,
    callback,
  };
}
export function editIventorySuccess(data) {
  return {
    type: EDITIVENTORYSSUCCESS,
    data,
  };
}
export function errorRequest(error) {
  return {
    type: ERRORREQUEST,
    error,
  };
}
export function deleteIventory(body, callback) {
  return {
    type: DELETE,
    body,
    callback,
  };
}
export function deleteIventorySuccess(data) {
  return {
    type: DELETESUCCESS,
    data,
  };
}
