import {
  TAKELIST_MENPAGE,
  TAKELIST_MENPAGE_SUCCESS,
  TAKELIST_MENPAGE_ERROR,
  FILTER_PRODUCT,
  FILTER_PRODUCT__SUCCESS,
  FILTER_PRODUCT__ERROR,
} from './constans';

export function takeListMenPage(body, callback) {
  return {
    type: TAKELIST_MENPAGE,
    body,
    callback,
  };
}
export function takeListSuccess(data) {
  return {
    type: TAKELIST_MENPAGE_SUCCESS,
    data,
  };
}
export function takeListError(data) {
  return {
    type: TAKELIST_MENPAGE_ERROR,
    data,
  };
}

export function filterProduct(body, callback) {
  return {
    type: FILTER_PRODUCT,
    body,
    callback,
  };
}
export function filterProdcutSuccess(data) {
  return {
    type: FILTER_PRODUCT__SUCCESS,
    data,
  };
}
export function filterProdcutError(data) {
  return {
    type: FILTER_PRODUCT__ERROR,
    data,
  };
}
