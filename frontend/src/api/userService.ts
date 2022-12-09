import { useQuery } from 'react-query';
import { axiosInstance } from './axios';

const queryKeys = {
  getMe: (token: string) => ['userService.getMe', token],
};

const getMe = () => {
  return axiosInstance.get('/user/me');
};

const useGetMe = (token) => {
  return useQuery(queryKeys.getMe(token), () => getMe(), {
    enabled: false,
    cacheTime: 0,
    staleTime: 0,
  });
};

export default {
  useGetMe,
};
