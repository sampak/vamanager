import Aircraft from '@shared/base/Aircraft';
import { CreateAirlineDTO } from '@shared/dto/CreateAirlineDTO';
import { useMutation, useQuery } from 'react-query';
import { axiosInstance } from './axios';

const queryKeys = {
  getAll: 'airlineService.getAll',
  getAircrafts: (workspaceID: string) => [
    'airlineService.getAircrafts',
    workspaceID,
  ],
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

export default {
  useCreateAirline,
  useGetAllAirlines,
  useJoinToAirline,
  useGetAircrafts,
};
