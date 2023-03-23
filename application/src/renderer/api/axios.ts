import axios from 'axios';
import { getToken } from './user';

export const axiosInstance = axios.create({
  baseURL: 'https://stg.vamanager.pl',
  headers: {
    'content-type': 'application/json',
  },
});

const reqInterceptor = (config) => {
  if (!config.headers) {
    config.headers = {};
  }
  config.headers.authorization = getToken();
  return config;
};

const reqInt = axiosInstance.interceptors.request.use(reqInterceptor);
