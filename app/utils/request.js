import axios from 'axios';
import Cookies from 'js-cookie';
import { COOKIES } from './constants';
import { handleError } from './handleError';
import { MOCK_DATA_GET } from '../mockData/mockDataGet';
import { MOCK_DATA_POST } from '../mockData/mockDataPost';
import { MOCK_DATA_PUT } from '../mockData/mockDataPut';

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

const instance = axios.create({
  baseURL: `http://127.0.0.1:8000`,
});

instance.defaults.timeout = 25000;

instance.interceptors.request.use(req => {
  req.headers.Authorization = `Bearer ${Cookies.get(COOKIES.access_token)}`;
  return req;
});

instance.interceptors.response.use(
  response => response,
  error => {
    const responseError = {
      ...error,
      response: {
        ...error.response,
      },
    };

    if (error.response) {
      handleError(error.response);
    }

    return responseError;
  },
);

export async function axiosGet(path) {
  if (MOCK_DATA_GET[path] && MOCK_DATA_GET[path].switch)
    return MOCK_DATA_GET[path];
  const res = await instance
    .get(path)
    .then(checkStatus)
    .catch(error => {
      if (!JSON.parse(JSON.stringify(error)).response) throw error;
    });
  return res;
}

export async function axiosPost(path, body) {
  if (MOCK_DATA_POST[path] && MOCK_DATA_POST[path].switch)
    return MOCK_DATA_POST[path];
  const res = await instance
    .post(path, body)
    .then(checkStatus)
    .catch(error => {
      if (!JSON.parse(JSON.stringify(error)).response) throw error;
    });
  return res;
}
export async function axiosPut(path, body) {
  if (MOCK_DATA_PUT[path] && MOCK_DATA_PUT[path].switch)
    return MOCK_DATA_POST[path];
  const res = await instance
    .put(path, body)
    .then(checkStatus)
    .catch(error => {
      if (!JSON.parse(JSON.stringify(error)).response) throw error;
    });
  return res;
}
