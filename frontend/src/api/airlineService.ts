import { CreateAirlineDTO } from '@shared/dto/CreateAirlineDTO';
import { useMutation } from 'react-query';
import { axiosInstance } from './axios';

const createAirline = (payload: CreateAirlineDTO) => {
  return axiosInstance.post('/airline', payload);
};

const useCreateAirline = () => {
  return useMutation(createAirline);
};

export default {
  useCreateAirline,
};
