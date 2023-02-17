import { axiosInstance } from '../../api/axios';
import { getToken, removeToken } from '../../api/user';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FC, Props } from './typings';
import { AxiosError } from 'axios';

const AxiosInterceptor: FC<Props> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const resInterceptor = (response) => {
      return response;
    };

    const errInterceptor = (error: AxiosError) => {
      if (error.response?.status === 401) {
        removeToken();
        navigate('/auth/signin');
      }

      return Promise.reject(error);
    };
    const resInt = axiosInstance.interceptors.response.use(
      resInterceptor,
      errInterceptor
    );

    return () => {
      axiosInstance.interceptors.response.eject(resInt);
    };
  }, [navigate]);

  return children;
};

export default AxiosInterceptor;
