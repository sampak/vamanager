import Aircraft from '@shared/base/Aircraft';
import { CreateAirlineDTO } from '@shared/dto/CreateAirlineDTO';
import { useMutation, useQuery } from 'react-query';
import { axiosInstance } from './axios';
import { UsersSearchDTO } from '@shared/dto/UsersSearchDTO';

const queryKeys = {
  getAll: 'airlineService.getAll',
  getAircrafts: (workspaceID: string) => [
    'airlineService.getAircrafts',
    workspaceID,
  ],
  getUsers: (workspaceID: string, payload: UsersSearchDTO) => [
    'airlineService.getUsers',
    workspaceID,
    payload,
  ],
};

const getUsers = (workspaceID, payload: UsersSearchDTO) => {
  const url = new URLSearchParams(payload as any);

  return axiosInstance.get(`/airline/${workspaceID}/users?${url}`);
};

const useGetUsers = (workspaceID, payload: UsersSearchDTO) => {
  return useQuery(queryKeys.getUsers(workspaceID, payload), () =>
    getUsers(workspaceID, payload)
  );
};

const createAirline = (payload: CreateAirlineDTO) => {
  return axiosInstance.post('/airline', payload);
};

const useCreateAirline = () => {
  return useMutation(createAirline);
};

const getAllAirlines = () => {
  return axiosInstance.get('/airline');
};

const useGetAllAirlines = () => {
  return useQuery(queryKeys.getAll, () => getAllAirlines());
};

const joinToAirline = (payload: { id: string }) => {
  return axiosInstance.post(`/airline/join/${payload.id}`);
};

const useJoinToAirline = () => {
  return useMutation(joinToAirline);
};

const getAircrafts = (workspaceID: string): Promise<{ data: Aircraft[] }> => {
  return axiosInstance.get(`/airline/${workspaceID}/aircrafts`);
};

const useGetAircrafts = (workspaceID: string) => {
  return useQuery(queryKeys.getAircrafts(workspaceID), () =>
    getAircrafts(workspaceID)
  );
};

const sendInvite = (payload: {
  workspaceID: string;
  payload: { email: string };
}) => {
  return axiosInstance.post(
    `/airline/${payload.workspaceID}/users`,
    payload.payload
  );
};

const useSendInvite = () => {
  return useMutation(sendInvite);
};
export default {
  useGetUsers,
  useCreateAirline,
  useGetAllAirlines,
  useJoinToAirline,
  useGetAircrafts,
  useSendInvite,
};
