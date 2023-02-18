import { useMutation } from 'react-query';
import { axiosInstance } from './axios';
import { CreatePirepDTO } from '@shared/dto/CreatePirepDTO';

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

export default {
  useCreatePirep,
  useUpdatePirep,
};
