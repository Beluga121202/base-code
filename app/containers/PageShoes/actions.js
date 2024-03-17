import {
  TAKELIST_PAGE,
  TAKELIST_PAGE_SUCCESS,
  TAKELIST_PAGE_ERROR,
  FILTER_PRODUCT,
  FILTER_PRODUCT__SUCCESS,
  FILTER_PRODUCT__ERROR,
  BANNER_PAGE,
  BANNER_PAGE_SUCCESS,
  TAKELIST_TRENDING_PAGE,
} from './constans';

export function takeListPage(body, callback) {
  return {
    type: TAKELIST_PAGE,
    body,
    callback,
  };
}
export function takeListTrendingPage(body, callback) {
  return {
    type: TAKELIST_TRENDING_PAGE,
    body,
    callback,
  };
}
export function takeListSuccess(data) {
  return {
    type: TAKELIST_PAGE_SUCCESS,
    data,
  };
}
export function takeListError(data) {
  return {
    type: TAKELIST_PAGE_ERROR,
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

export function takeBanner(body, callback) {
  return {
    type: BANNER_PAGE,
    body,
    callback,
  };
}

export function takeBannerSuccess(data) {
  return {
    type: BANNER_PAGE_SUCCESS,
    data,
  };
}
