import axios from 'axios';
import config from '../config';
import env from '../../env';

export const axiosInstance = axios.create({
  baseURL: env.API_URL,
  headers: {
    'content-type': 'application/json',
  },
});

const reqInterceptor = (axiosConfig) => {
  if (!axiosConfig.headers) {
    axiosConfig.headers = {};
  }
  axiosConfig.headers.authorization = config.access_token;
  return axiosConfig;
};

axiosInstance.interceptors.request.use(reqInterceptor);

axiosInstance.interceptors.response.use(
  function (response) {
    // For status code with 2xx
    return response;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);
