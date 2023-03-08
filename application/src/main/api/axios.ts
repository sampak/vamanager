import axios from 'axios';
import config from '../config';

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL ?? 'http://localhost:4000',
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
    console.log(error.response.data);
    return Promise.reject(error);
  }
);
