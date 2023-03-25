import * as fsuipc from 'fsuipc';
import log from 'electron-log';
import { getDistance } from 'geolib';
import { Acars, State } from './typings';
import { GearState } from '@shared/base/GearState.enum';
import { Pirep } from '@shared/base/Pirep';
import { FlightPhase } from '@shared/base/FlightPhase.enum';
import {
  bindVariables,
  calculateTotalFuel,
  getSimulatorName,
  pushToLogs,
} from './utils';
import config from '../config';
import { EventsType } from '../../dto/Events';
import moment from 'moment';
import { checkEngines } from './engines';
import { checkGears } from './gears';
import { checkFlightPhase } from './checkFlightPhase';
import { Tracker } from '../../dto/Tracker';
import trackerService from '../api/trackerService';

const acars: Acars = {
  init: true,
  flightSimulator: '',
  type: '',
  lat: 0,
  lng: 0,
  heading: 0,
  altitude: 0,
  verticalSpeed: 0,
  groundSpeed: 0,
  onGround: 0,
  ias: 0,
  engines: [0, 0],
  gearState: GearState.DOWN,
  flightPhase: FlightPhase.INITIALIZED,
  flapsPosition: 0,
  transponder: '2000',
  fuel: {
    block: 0, // Fuel when aircraft leave gate
    total: 0, // Acutal Fuel
  },
  weight: {
    zfw: 0,
  },
  times: {
    estimatedOffBlockTime: undefined,
    flightStartedAt: undefined,
    taxiStartedAt: undefined,
    takeOffAt: undefined,
    landingAt: undefined,
    onBlocksAt: undefined,
  },
  landing_rate: 0,
  sim_paused: false,
  stall: false,
  overspeed: false,
  logs: [],
  positionHistory: [],
};

const initialState: State = {
  pirep: null,
  distance: 0,
  trackerId: '',
  connected: false,
  tryReconnect: false,
  trackFlight: false,
  lastTrackedTime: null,
  handler: null,
  object: null,
  fetchIntervalFromSim: null,
  trackerInterval: null,
  acars: { ...acars },
  sim: { ...acars },
};

let state = { ...initialState };

const setPirep = (pirep: Pirep) => {
  state.pirep = pirep;
};

const connect = async () => {
  console.log('Creating FSUIPC object...');

  if (state.handler) {
    disconnect();
  }

  state.handler = new fsuipc.FSUIPC();
  state.handler
    .open()
    .then((obj: any) => {
      console.log('[SimConnect] Connection created binding variables');
      bindVariables(obj);
      console.log('[SimConnect] Variables binded');
      state.connected = true;
      state.object = obj;
      getSimData();
    })
    .catch(() => {
      state.handler = null;
      state.connected = false;
      console.log('Sim is not connected');
    });
};

const disconnect = () => {
  if (state.fetchIntervalFromSim) {
    clearInterval(state.fetchIntervalFromSim);
    state.fetchIntervalFromSim = null;
  }
  state.handler.close();
  state.connected = false;
  state.object = null;
};

const getAcarsData = () => {
  return state.acars;
};

const getState = () => {
  return state;
};

const insertPositionHistory = () => {
  state.acars.positionHistory.push({
    lat: state.acars.lat,
    lng: state.acars.lng,
    heading: state.acars.heading,
    altitude: state.acars.altitude,
    ias: state.acars.ias,
    groundSpeed: state.acars.groundSpeed,
    verticalSpeed: state.acars.verticalSpeed,
    flgihtPhase: state.acars.flightPhase,
  });
};

const checkFlightStatus = () => {
  checkEngines(state);
  checkGears(state);
  // Flaps
  // Stall
  // Overspeed
  checkFlightPhase(state);

  insertPositionHistory();

  const timeDiff = moment(new Date()).diff(state.lastTrackedTime, 'second');
  if (!state.acars.init && timeDiff > 10) {
    state.lastTrackedTime = new Date();
    trackerService.sendTracker(state.trackerId, state);
  }

  if (state.acars.init) {
    state.lastTrackedTime = new Date();
  }

  state.acars.init = false;
};

const getSimData = () => {
  if (state.fetchIntervalFromSim) {
    clearInterval(state.fetchIntervalFromSim);
    state.fetchIntervalFromSim = null;
  }

  state.fetchIntervalFromSim = setInterval(() => {
    state.object
      .process()
      .then((value: any) => {
        state.acars.flightSimulator = getSimulatorName(value.simPath);
        state.acars.type = value.aircraftType;
        state.acars.lat =
          (value.latitude * 90.0) / (10001750.0 * 65536.0 * 65536.0);
        state.acars.lng =
          (value.longitude * 360.0) / (65535.0 * 65536.0 * 65536.0 * 65536.0);

        state.acars.heading = (value.heading * 360) / (65536 * 65536);
        state.acars.altitude = value.groundAltitude;
        state.acars.verticalSpeed = (value.verticalSpeed * 60 * 3.28084) / 256;
        state.acars.groundSpeed = ((value.groundSpeed / 65536) * 3600) / 1852;
        state.acars.ias = Math.ceil(value.ias / 128);
        state.sim.gearState = value.gear ? GearState.DOWN : GearState.UP;
        state.sim.flapsPosition = value.flaps;
        state.sim.stall = value.stallWarning;
        state.sim.overspeed = value.overspeedWarning;
        state.sim.onGround = value.onGround;
        state.acars.onGround = value.onGround;
        state.sim.sim_paused = value.pause;
        state.sim.engines = [value.engine_one, value.engine_two];
        state.sim.weight.zfw = value.zfw * 256;
        state.acars.transponder = value.transponder.toString(16).toUpperCase();
        state.acars.fuel.total = calculateTotalFuel(value);
        if (state.pirep) {
          state.distance = getDistance(
            { latitude: state.acars.lat, longitude: state.acars.lng },
            {
              latitude: state.pirep.destination!.lat,
              longitude: state.pirep.destination!.lng,
            }
          );
        }

        if (state.trackFlight) {
          checkFlightStatus();
        }

        // console.log('[Acars] New data from sim fetched ', state.acars);
      })
      .catch((error: any) => {
        console.log("[Acars] Can't fetch data from sim", error);
      });
  }, 1000);
};

const setFlightPhase = (flightPhase: FlightPhase) => {
  pushToLogs(
    state,
    `Flight phase was changed from ${state.acars.flightPhase} to ${flightPhase}`,
    true,
    true
  );
  state.acars.flightPhase = flightPhase;
};

const startTracking = async (trackerId: string) => {
  console.log('[ACARS] Starting Tracking Flight');
  pushToLogs(
    state,
    `Flight tracking started sim: ${state.acars.flightSimulator} aircraft ${state.acars.type}`,
    true,
    false
  );
  clearTrackerInterval();
  state.trackerId = trackerId;
  // setFlightPhase(FlightPhase.BOARDING);
  state.acars.times.estimatedOffBlockTime = moment()
    .add(40, 'minutes')
    .toDate();
  state.trackFlight = true;
  state.lastTrackedTime = new Date();
  state.trackerInterval = setInterval(() => {
    config.mainWindow?.webContents.send(EventsType.TRACKER, {
      trackerId: state.trackerId,
      pirep: state.pirep,
      acars: state.acars,
      distance: state.distance,
    } as Tracker);
  }, 1000);
};

const clearTrackerInterval = () => {
  if (state.trackerInterval) {
    clearTimeout(state.trackerInterval);
  }
};

const stopTracking = async () => {
  clearTrackerInterval();
  disconnect();
  state = { ...initialState };
};

const isConnection = async (): Promise<{ connected: boolean; sim: string }> => {
  return new Promise((resolve) => {
    if (!state.handler) {
      console.log('connection is not established trying to connect');
      connect();
      setTimeout(() => {
        return resolve({
          connected: state.connected,
          sim: state.acars.flightSimulator,
        });
      }, 2100);
      return;
    }

    return resolve({
      connected: state.connected,
      sim: state.acars.flightSimulator,
    });
  });
};

export default {
  connect,
  disconnect,
  isConnection,
  setPirep,
  getAcarsData,
  getState,
  startTracking,
  stopTracking,
};
