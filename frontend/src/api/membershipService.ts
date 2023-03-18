import { axiosInstance } from './axios';
import { updateRoleDTO } from '@shared/dto/updateRoleDTO';
import { UpdateMembershipStatusDTO } from '@shared/dto/UpdateMembershipStatusDTO';
import { useMutation, useQuery } from 'react-query';

const queryKeys = {
  getChart: (workspaceId: string, membershipId: string) => [
    'membershipService.getChart',
    workspaceId,
    membershipId,
  ],
};

const updateRole = (payload: {
  workspaceID: string;
  membershipID: string;
  payload: updateRoleDTO;
}) => {
  return axiosInstance.put(
    `/airline/${payload.workspaceID}/memberships/${payload.membershipID}/role`,
    payload.payload
  );
};

const useUpdateRole = () => {
  return useMutation(updateRole);
};

const updateStatus = (payload: {
  workspaceID: string;
  membershipID: string;
  payload: UpdateMembershipStatusDTO;
}) => {
  return axiosInstance.put(
    `/airline/${payload.workspaceID}/memberships/${payload.membershipID}/status`,
    payload.payload
  );
};

const useUpdateStatus = () => {
  return useMutation(updateStatus);
};

const resendInvite = (payload: {
  workspaceID: string;
  membershipID: string;
}) => {
  return axiosInstance.put(
    `/airline/${payload.workspaceID}/memberships/${payload.membershipID}/reinvite`
  );
};

const useResendInvite = () => {
  return useMutation(resendInvite);
};

const getChart = (workspaceId: string, membershipId: string) => {
  return axiosInstance.get(
    `/airline/${workspaceId}/memberships/${membershipId}/chart`
  );
};

const useGetChart = (workspaceId: string, membershipId: string) => {
  return useQuery(queryKeys.getChart(workspaceId, membershipId), () =>
    getChart(workspaceId, membershipId)
  );
};

export default {
  useUpdateRole,
  useUpdateStatus,
  useResendInvite,
  useGetChart,
};
