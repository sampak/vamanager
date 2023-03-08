import { useMutation, useQuery } from 'react-query';
import { axiosInstance } from './axios';
import { CreatePirepDTO } from '@shared/dto/CreatePirepDTO';

const queryKeys = {
  getPireps: (workspaceId: string) => ['pirepService.getPireps', workspaceId],
  getPirep: (workspaceId: string, pirepId: string) => [
    'pirepService.getPirep',
    workspaceId,
    pirepId,
  ],
};

const createPirep = (payload: {
  workspaceID: string;
  scheduleID: string;
  payload: CreatePirepDTO;
}) => {
  return axiosInstance.post(
    `/airline/${payload.workspaceID}/pireps/${payload.scheduleID}`,
    payload.payload
  );
};
const useCreatePirep = () => {
  return useMutation(createPirep);
};

const updatePirep = (payload: { workspaceID: string; pirepID: string }) => {
  return axiosInstance.patch(
    `/airline/${payload.workspaceID}/pireps/${payload.pirepID}`
  );
};

const useUpdatePirep = () => {
  return useMutation(updatePirep);
};

const getPireps = (workspaceID: string) => {
  return axiosInstance.get(`/airline/${workspaceID}/pireps`);
};

const useGetPireps = (workspaceID: string) => {
  return useQuery(queryKeys.getPireps(workspaceID), () =>
    getPireps(workspaceID)
  );
};

const getPirep = (workspaceID: string, pirepId: string) => {
  return axiosInstance.get(`/airline/${workspaceID}/pireps/${pirepId}`);
};

const useGetPirep = (workspaceID: string, pirepId: string) => {
  return useQuery(queryKeys.getPirep(workspaceID, pirepId), () =>
    getPirep(workspaceID, pirepId)
  );
};

export default {
  useCreatePirep,
  useUpdatePirep,
  useGetPireps,
  useGetPirep,
};
