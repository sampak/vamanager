import axios from 'axios';
import { getToken } from './user';
import env from '../../env';
export const axiosInstance = axios.create({
  baseURL: env.API_URL,
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
