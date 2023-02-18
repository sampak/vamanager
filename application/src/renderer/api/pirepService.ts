import { useQuery, useMutation } from 'react-query';
import { axiosInstance } from './axios';

const queryKeys = {
  getPireps: (workspaceId: string) => ['pirepService.getPireps', workspaceId],
};

const getPireps = (workspaceId: string) => {
  return axiosInstance.get(`/airline/${workspaceId}/pireps/booked`);
};

const useGetPireps = (workspaceId: string) => {
  return useQuery(queryKeys.getPireps(workspaceId), () =>
    getPireps(workspaceId)
  );
};

export default {
  useGetPireps,
};
