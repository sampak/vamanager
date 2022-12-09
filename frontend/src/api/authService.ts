import { useMutation } from 'react-query';
import { LoginDTO } from '@shared/dto/LoginDTO';
import { axiosInstance } from './axios';
import { AxiosError, AxiosResponse } from 'axios';
const login = async (payload: LoginDTO) => {
  return await axiosInstance.post('/auth/signin', payload);
};

const useLogin = () => {
  return useMutation(login);
};

export default {
  useLogin,
};
