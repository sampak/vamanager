import { axiosInstance } from 'api/axios';
import { getToken } from 'api/user';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FC, Props } from './typings';

const AxiosInterceptor: FC<Props> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const reqInterceptor = (config) => {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.authorization = getToken();
      return config;
    };

    const resInterceptor = (response) => {
      return response;
    };

    const errInterceptor = (error) => {
      Promise.reject(error);
    };

    const reqInt = axiosInstance.interceptors.request.use(reqInterceptor);

    const resInt = axiosInstance.interceptors.response.use(
      resInterceptor,
      errInterceptor
    );

    return () => {
      axiosInstance.interceptors.request.eject(reqInt);
      axiosInstance.interceptors.response.eject(resInt);
    };
  }, [navigate]);

  return children;
};

export default AxiosInterceptor;
