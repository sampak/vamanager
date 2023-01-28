import AircraftDealer from '@shared/base/AircraftDealer';
import { useMutation, useQuery } from 'react-query';
import { axiosInstance } from './axios';

const queryKeys = {
  getDealerAircrafts: (workspaceId: string) => [
    'aircraftService.getDealerAircrafts',
    workspaceId,
  ],

  searchCompanyTypeOfAircraft: (workspaceId: string, search: string) => [
    'aircraftService.searchCompanyTypeOfAircraft',
    workspaceId,
    search,
  ],
};

const searchCompanyTypeOfAircraft = async (
  workspaceId: string,
  search: string
) => {
  return await axiosInstance.get(
    `/airline/${workspaceId}/aircraft/type/${search}`
  );
};

const useSearchCompanyTypeOfAircraft = (
  workspaceId: string,
  search: string,
  enabled?: boolean
) => {
  return useQuery(
    queryKeys.searchCompanyTypeOfAircraft(workspaceId, search),
    () => searchCompanyTypeOfAircraft(workspaceId, search),
    {
      enabled: enabled ?? true,
    }
  );
};

const buyAircraft = (payload: {
  workspaceID: string;
  aircraftID: string;
  registreation: string;
}) => {
  return axiosInstance.post(
    `/airline/${payload.workspaceID}/aircraft/${payload.aircraftID}`,
    { registration: payload.registreation }
  );
};

const useBuyAircraft = () => {
  return useMutation(buyAircraft);
};

const getAllDealerAircrafts = (
  workspaceId: string
): Promise<{ data: AircraftDealer[] }> => {
  return axiosInstance.get(`/airline/${workspaceId}/aircraft/dealer`);
};

const useGetAllDealerAircrafts = (workspaceId: string) => {
  return useQuery(queryKeys.getDealerAircrafts(workspaceId), () =>
    getAllDealerAircrafts(workspaceId)
  );
};

export default {
  useGetAllDealerAircrafts,
  useBuyAircraft,
  useSearchCompanyTypeOfAircraft,
};
