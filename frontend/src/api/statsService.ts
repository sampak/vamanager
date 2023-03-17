import { useQuery } from 'react-query';
import { axiosInstance } from './axios';

const queryKeys = {
  getLastPireps: () => ['statsService.getPireps'],
  getRanking: () => ['statsService.getRanking'],
};

const getLastPireps = () => {
  return axiosInstance.get('/stats/last-pireps');
};

const useGetLastPireps = () => {
  return useQuery(queryKeys.getLastPireps(), () => getLastPireps());
};

const getRanking = () => {
  return axiosInstance.get('/stats/ranking');
};

const useGetRanking = () => {
  return useQuery(queryKeys.getRanking(), () => getRanking());
};

export default {
  useGetLastPireps,
  useGetRanking,
};
