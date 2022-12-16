import { CreateAirlineDTO } from '@shared/dto/CreateAirlineDTO';
import { useMutation, useQuery } from 'react-query';
import { axiosInstance } from './axios';

const queryKeys = {
  getAll: 'userService.getMe',
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

export default {
  useCreateAirline,
  useGetAllAirlines,
  useJoinToAirline,
};
