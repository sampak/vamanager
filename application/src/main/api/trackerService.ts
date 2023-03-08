import config from '../config';
import { axiosInstance } from './axios';
import { RequestTrackingDTO } from '@shared/dto/RequestTrackingDTO';
import { State } from '../simConnect/typings';
import { EventType } from '@shared/base/EventType';
import { stateToRequestTracking } from '../adapters/stateToRequestTracking';

const request = async (pirepId: string, payload: RequestTrackingDTO) => {
  return await axiosInstance.post(
    `/airline/${config.workspaceId}/tracker/request/${pirepId}`,
    payload
  );
};

const submitPirep = async (trackerId: string, state: State) => {
  return await axiosInstance.post(
    `/airline/${config.workspaceId}/tracker/submit/${trackerId}`,
    stateToRequestTracking(state, EventType.FLIGHT_ENDED)
  );
};

const sendTracker = async (trackerId: string, state: State) => {
  return await axiosInstance.post(
    `/airline/${config.workspaceId}/tracker/track/${trackerId}`,
    stateToRequestTracking(state, EventType.FLIGHT_PHASE)
  );
};

const sendEvent = async (trackerId: string, state: State, event: EventType) => {
  return await axiosInstance.post(
    `/airline/${config.workspaceId}/tracker/event/${trackerId}`,
    stateToRequestTracking(state, event)
  );
};

export default {
  request,
  submitPirep,
  sendTracker,
  sendEvent,
};
