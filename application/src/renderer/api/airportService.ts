import { useMutation, useQuery } from 'react-query';
import { axiosInstance } from './axios';

const queryKeys = {
  getAll: 'airportService.getAll',
  getSearch: (search: string) => ['airportService.getSearch', search],
};

const getAll = async () => {
  return await axiosInstance.get('/airport');
};

const useGetAll = () => {
  return useQuery(queryKeys.getAll, () => getAll(), {
    refetchOnWindowFocus: false,
  });
};

const getSearch = async (search: string) => {
  return await axiosInstance.get(`/airport/${search}`);
};

const useGetSearch = (search: string, enabled?: boolean) => {
  return useQuery(queryKeys.getSearch(search), () => getSearch(search), {
    enabled: enabled ?? true,
  });
};

export default {
  useGetAll,
  useGetSearch,
};
