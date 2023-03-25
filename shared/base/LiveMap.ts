import { FlightPhase } from "./FlightPhase.enum";

export interface LiveMap {
  id: string;
  trackerId: string;
  lat: number;
  lng: number;
  ias: number;
  heading: number;
  vs: number;
  gs: number;
  altitude: number;
  distance: number;
  flight_phase: FlightPhase;
  transponder: string;
  createdAt: Date;
}
