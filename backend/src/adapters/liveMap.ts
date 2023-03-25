import { Tracker } from '@prisma/client';
import { FlightPhase } from '@shared/base/FlightPhase.enum';
import { LiveMap as LiveMapDTO } from '@shared/base/LiveMap';
export const LiveMap = (tracker: Tracker): LiveMapDTO => {
  return {
    id: tracker.id,
    trackerId: tracker.trackerId,
    lat: tracker.lat,
    lng: tracker.lng,
    ias: tracker.ias,
    heading: tracker.heading,
    vs: tracker.vs,
    gs: tracker.gs,
    altitude: tracker.altitude,
    distance: tracker.distance,
    flight_phase: tracker.flight_phase as FlightPhase,
    transponder: tracker.transponder,
    createdAt: tracker.createdAt,
  };
};
