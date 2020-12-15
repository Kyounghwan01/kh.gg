/* eslint-disable func-names */
/* eslint-disable dot-notation */
import axios from 'axios';
import qs from 'qs';

const headers = {
  ...axios.defaults.headers,
  'Cache-control': 'no-cache',
  'X-Riot-Token': process.env.REACT_APP_API_KEY,
};
const paramsSerializer = (params: any) => {
  return qs.stringify(params, {
    arrayFormat: 'brackets',
    encodeValuesOnly: true,
    skipNulls: true,
  });
};

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers,
  paramsSerializer,
});

export default instance;
