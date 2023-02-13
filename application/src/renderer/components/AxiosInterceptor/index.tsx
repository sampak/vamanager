import { axiosInstance } from '../../api/axios';
import { getToken } from '../../api/user';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FC, Props } from './typings';

const AxiosInterceptor: FC<Props> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const resInterceptor = (response) => {
      return response;
    };

    const errInterceptor = (error) => {
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
