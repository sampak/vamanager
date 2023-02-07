import { useMutation, useQuery } from 'react-query';
import { LoginDTO } from '@shared/dto/LoginDTO';
import { RegisterDTO } from '@shared/dto/RegisterDTO';
import { axiosInstance } from './axios';

const queryKeys = {
  resendCode: (userId: string) => ['authService.resendCode', userId],
};

const register = async (payload: RegisterDTO) => {
  return await axiosInstance.post('/auth/signup', payload);
};

const useRegister = () => {
  return useMutation(register);
};

const login = async (payload: LoginDTO) => {
  return await axiosInstance.post('/auth/signin', payload);
};

const useLogin = () => {
  return useMutation(login);
};

const resendCode = async (userId: string) => {
  return await axiosInstance.get(`/auth/resend/${userId}`);
};

const useResendCode = (userId: string) => {
  return useQuery(queryKeys.resendCode(userId), () => resendCode(userId), {
    enabled: false,
  });
};

const sendCode = async (payload: {
  code: string;
  userId: string;
  company?: string;
}) => {
  return await axiosInstance.post('/auth/code', payload);
};

const useSendCode = () => {
  return useMutation(sendCode);
};

export default {
  useRegister,
  useLogin,
  useResendCode,
  useSendCode,
};
