import { State } from '../simConnect/typings';
import { RequestTrackingDTO } from '@shared/dto/RequestTrackingDTO';
import { EventType } from '@shared/base/EventType';

export const stateToRequestTracking = (
  state: State,
  event: EventType
): RequestTrackingDTO => {
  return {
    type: state.acars.type,
    lat: state.acars.lat,
    lng: state.acars.lng,
    ias: state.acars.ias,
    heading: state.acars.heading,
    vs: state.acars.verticalSpeed,
    gs: state.acars.groundSpeed,
    altitude: state.acars.altitude,
    sim_time: '00:00',
    engines: JSON.stringify(state.acars.engines),
    gearState: state.acars.gearState,
    flaps: state.acars.flapsPosition,
    fuel: state.acars.fuel.total,
    weight: state.acars.weight.zfw,
    stall: state.acars.stall,
    overspeed: state.acars.overspeed,
    sim_paused: state.acars.sim_paused,
    transponder: String(state.acars.transponder),
    onGround: !!state.acars.onGround,
    flight_phase: state.acars.flightPhase,
    eventType: event,
    rate: state.acars.landing_rate,
  };
};
