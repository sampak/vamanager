import { useMutation, useQuery } from 'react-query';
import { axiosInstance } from './axios';

const queryKeys = {
  getAll: 'airportService.getAll',
};

const getAll = async () => {
  return await axiosInstance.get('/airport');
};

const useGetAll = () => {
  return useQuery(queryKeys.getAll, () => getAll(), {
    refetchOnWindowFocus: false,
  });
};

export default {
  useGetAll,
};
