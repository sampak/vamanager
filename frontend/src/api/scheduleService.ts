import { useQuery, useMutation } from 'react-query';
import { axiosInstance } from './axios';
import { CreateSimbriefDTO } from '@shared/dto/CreateSimbriefDTO';
import moment from 'moment';

const queryKeys = {
  getSchedules: (workspaceId: string) => [
    'scheduleService.getSchedules',
    workspaceId,
  ],
};

const getSchedules = (workspaceId: string) => {
  return axiosInstance.get(`/airline/${workspaceId}/schedule`);
};

const useGetSchedules = (workspaceId: string) => {
  return useQuery(queryKeys.getSchedules(workspaceId), () =>
    getSchedules(workspaceId)
  );
};

const updateSchedule = (payload: {
  workspaceId: string;
  staticID: string;
}): Promise<{ data: { key: string; id: string } }> => {
  return axiosInstance.put(
    `/airline/${payload.workspaceId}/schedule/simbrief/${payload.staticID}`
  );
};

const useUpdateSchedule = () => {
  return useMutation(updateSchedule);
};

const createSchedule = async (payload: {
  workspaceId: string;
  payload: CreateSimbriefDTO;
}): Promise<{ data: { scheduleId: string; url: string } }> => {
  return await axiosInstance.post(
    `/airline/${payload.workspaceId}/schedule/simbrief`,
    payload.payload
  );
};

const useCreateSchedule = () => {
  return useMutation(createSchedule);
};

const removeSchedule = async (payload: {
  workspaceId: string;
  scheduleID: string;
}) => {
  return await axiosInstance.delete(
    `/airline/${payload.workspaceId}/schedule/${payload.scheduleID}`
  );
};

const useRemoveSchedule = () => {
  return useMutation(removeSchedule);
};

export default {
  useGetSchedules,
  useUpdateSchedule,
  useCreateSchedule,
  useRemoveSchedule,
};
