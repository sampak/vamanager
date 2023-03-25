import { useQuery } from 'react-query';
import { axiosInstance } from './axios';
import { LiveMapResponse } from '@shared/responses/LiveMapResponse';

const queryKeys = {
  getLiveMap: () => ['livemapService.getLiveMap'],
  getTraffic: (trackerId: string) => ['liveMapService.getTraffic', trackerId],
};

const getLiveMap = () => {
  return axiosInstance.get(`/livemap`);
};

const useGetLiveMap = () => {
  return useQuery(queryKeys.getLiveMap(), () => getLiveMap(), {
    staleTime: 0,
  });
};

const getTraffic = (trackerId: string): Promise<{ data: LiveMapResponse }> => {
  return axiosInstance.get(`/livemap/${trackerId}`);
};

const useGetTraffic = (trackerId: string) => {
  return useQuery(
    queryKeys.getTraffic(trackerId),
    () => getTraffic(trackerId),
    {
      enabled: false,
    }
  );
};

export default {
  useGetLiveMap,
  useGetTraffic,
};
