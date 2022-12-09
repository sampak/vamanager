import axios from 'axios';
import { getToken } from './user';

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL ?? 'http://localhost:4000',
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
