import { GearState } from '@shared/base/GearState.enum';
import { FlightPhase } from '@shared/base/FlightPhase.enum';
import { Pirep } from '@shared/base/Pirep';

export interface Position {
  lat: number;
  lng: number;
  heading: number;
  altitude: number;
  ias: number;
  groundSpeed: number;
  verticalSpeed: number;
  flgihtPhase: FlightPhase;
}

export interface Acars {
  init: boolean;
  flightSimulator: string;
  type: string;
  lat: number;
  lng: number;
  transponder: string;
  heading: number;
  altitude: number;
  verticalSpeed: number;
  groundSpeed: number;
  ias: number;
  onGround: number | boolean;
  engines:
    | [number, number]
    | [number, number, number]
    | [number, number, number, number];
  gearState: GearState;
  flightPhase: FlightPhase;
  flapsPosition: number;
  fuel: {
    block: number;
    total: number;
  };
  weight: {
    zfw: number;
  };
  times: {
    estimatedOffBlockTime: undefined | Date;
    flightStartedAt: undefined | Date;
    taxiStartedAt: undefined | Date;
    takeOffAt: undefined | Date;
    landingAt: undefined | Date;
    onBlocksAt: undefined | Date;
  };
  landing_rate: number;
  sim_paused: boolean;
  stall: boolean;
  overspeed: boolean;
  logs: Log[];
  positionHistory: Position[];
}

export interface Log {
  id: string;
  time: Date;
  text: string;
  sended: boolean;
}

export interface State {
  pirep: Pirep | null;
  distance: number;
  trackerId: string;
  connected: boolean;
  tryReconnect: boolean;
  trackFlight: boolean;
  lastTrackedTime: Date | null;
  handler: any;
  object: any;
  fetchIntervalFromSim: null | ReturnType<typeof setInterval>;
  trackerInterval: null | ReturnType<typeof setInterval>;
  acars: Acars;
  sim: Acars;
}

export const CONSTS = {
  ENGINE_ON: 2000,
};
