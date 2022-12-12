import { useQuery } from 'react-query';
import { axiosInstance } from './axios';

const queryKeys = {
  getMe: (token: string, workspace: string | undefined) => [
    'userService.getMe',
    token,
    workspace,
  ],
};

const getMe = (workspace: string | undefined) => {
  let url = '/user/me';

  if (workspace) {
    url += `/${workspace}`;
  }

  return axiosInstance.get(url);
};

const useGetMe = (token: string, workspace?: string) => {
  return useQuery(queryKeys.getMe(token, workspace), () => getMe(workspace), {
    enabled: false,
    cacheTime: 0,
    staleTime: 0,
  });
};

export default {
  useGetMe,
};
