import {
  TAKE_LIST_SEARCH,
  TAKE_LIST_SEARCH__ERROR,
  TAKE_LIST_SEARCH__SUCCESS,
} from './constatns';

export function takeListSearchPage(body, callback) {
  return {
    type: TAKE_LIST_SEARCH,
    body,
    callback,
  };
}
export function takeListSearchPageSuccess(body) {
  return {
    type: TAKE_LIST_SEARCH__SUCCESS,
    body,
  };
}
export function takeListSearchPageError(body) {
  return {
    type: TAKE_LIST_SEARCH__ERROR,
    body,
  };
}
