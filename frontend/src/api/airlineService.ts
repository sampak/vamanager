import Aircraft from '@shared/base/Aircraft';
import { CreateAirlineDTO } from '@shared/dto/CreateAirlineDTO';
import { useMutation, useQuery } from 'react-query';
import { axiosInstance } from './axios';
import { UsersSearchDTO } from '@shared/dto/UsersSearchDTO';
import { SearchAirplaneDTO } from '@shared/dto/SearchAirplaneDTO';

const queryKeys = {
  getAll: 'airlineService.getAll',
  getAircrafts: (workspaceID: string, search: string, type: string) => [
    'airlineService.getAircrafts',
    workspaceID,
    search,
    type,
  ],
  getUsers: (workspaceID: string, payload: UsersSearchDTO) => [
    'airlineService.getUsers',
    workspaceID,
    payload,
  ],

  searchAircrafts: (workspaceID: string, payload: SearchAirplaneDTO) => [
    'airlineService.searchAircrafts',
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

const getAircrafts = (
  workspaceID: string,
  search?: string,
  type?: string
): Promise<{ data: Aircraft[] }> => {
  return axiosInstance.get(`/airline/${workspaceID}/aircrafts`);
};

const useGetAircrafts = (
  workspaceID: string,
  search?: string,
  type?: string,
  enabled = true
) => {
  return useQuery(
    queryKeys.getAircrafts(workspaceID, search ?? '', type ?? ''),
    () => getAircrafts(workspaceID, search, type),
    {
      enabled: enabled,
    }
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

const searchAircrafts = (workspaceID: string, payload: SearchAirplaneDTO) => {
  const params = new URLSearchParams(payload as any);
  return axiosInstance.get(
    `/airline/${workspaceID}/aircrafts/search?${params}`
  );
};

const useSearchAircrafts = (
  workspaceID: string,
  payload: SearchAirplaneDTO,
  enabled = true
) => {
  return useQuery(
    queryKeys.searchAircrafts(workspaceID, payload),
    () => searchAircrafts(workspaceID, payload),
    {
      enabled: enabled,
    }
  );
};

export default {
  useGetUsers,
  useCreateAirline,
  useGetAllAirlines,
  useJoinToAirline,
  useGetAircrafts,
  useSendInvite,
  useSearchAircrafts,
};
