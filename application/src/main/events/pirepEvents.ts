import { EventsType } from '../../dto/Events';
import { EventType } from '@shared/base/EventType';
import { ipcMain } from 'electron';
import log from 'electron-log';
import simConnect from '../simConnect';
import trackerService from '../api/trackerService';
import { SubmitPirepResponse } from '../../dto/response/SubmitPirepResponse';
import { Tracker } from '../../dto/Tracker';
import { stateToRequestTracking } from '../adapters/stateToRequestTracking';

ipcMain.on(EventsType.CHECK_SIM_STATUS, async (event) => {
  const response = await simConnect.isConnection();

  log.info(
    `Status of simulator connection: ${response.connected}, sim: ${response.sim}`
  );
  event.reply(EventsType.CHECK_SIM_STATUS, {
    connection: response.connected,
    sim: '',
  });
});

ipcMain.on(EventsType.START_TRACKING, async (event, data) => {
  const payload = simConnect.getState();

  try {
    const sendData = stateToRequestTracking(payload, EventType.START_FLIGHT);

    const response = await trackerService.request(payload.pirep!.id!, sendData);
    simConnect.startTracking(response.data.key);
    const state = simConnect.getState();
    event.reply(EventsType.TRACKING_STATUS, {
      canTrack: true,
      trackerId: state.trackerId,
      pirep: state.pirep,
      acars: state.acars,
      distance: state.distance,
    } as Tracker);
  } catch (error: any) {
    console.log('error catched', error);
    event.reply(EventsType.TRACKING_STATUS, {
      error: error.response.data,
    });
  }
});

ipcMain.on(EventsType.SET_PIREP, async (event, data) => {
  simConnect.setPirep(data.pirep);
});

ipcMain.on(EventsType.SUBMIT_PIREP, async (event) => {
  try {
    const state = simConnect.getState();
    await trackerService.submitPirep(state.trackerId, state);
    event.reply(EventsType.SUBMIT_PIREP_RESPONSE, {
      success: true,
    } as SubmitPirepResponse);
    simConnect.stopTracking();
  } catch (e) {
    console.log(e);
    event.reply(EventsType.SUBMIT_PIREP_RESPONSE, {
      success: false,
    } as SubmitPirepResponse);
  }
});
