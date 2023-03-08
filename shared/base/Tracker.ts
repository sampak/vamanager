import { FlightPhase } from "./FlightPhase.enum";
import { GearState } from "./GearState.enum";
import { TypeOfTracker } from "./TypeOfTracker";
import { User } from "./User";

export interface Tracker {
  id: string;
  trackerId: string;
  userId: string;
  user?: User;
  type: TypeOfTracker;
  eventType: string;
  log: string;
  lat: number;
  lng: number;
  ias: number;
  heading: number;
  vs: number;
  gs: number;
  altitude: number;
  distance: number;
  sim_time: string;
  engines: string;
  gearState: GearState;
  flight_phase: FlightPhase;
  onGround: boolean;
  flaps: number;
  fuel: number;
  weight: number;
  landing_rate: number;
  stall: boolean;
  overspeed: boolean;
  simPaused?: boolean;
  transponder: string;
  createdAt: Date;
}
