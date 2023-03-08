import { State } from './typings';
import { FlightPhase } from '@shared/base/FlightPhase.enum';
import { calculateGForce, calculateLandingRate, pushToLogs } from './utils';

import { EventType } from '@shared/base/EventType';
import { GearState } from '@shared/base/GearState.enum';
import trackerService from '../api/trackerService';

const checkClimbing = (state: State) => {
  const positions = state.acars.positionHistory.slice(-10);

  if (positions.length > 3) {
    const isSameAltitude = positions.filter(
      (position) => position.verticalSpeed > 500
    );

    return isSameAltitude.length >= 2;
  }

  return false;
};

const checkDescent = (state: State) => {
  const positions = state.acars.positionHistory.slice(-10);

  if (positions.length > 3) {
    const isSameAltitude = positions.filter(
      (position) => position.verticalSpeed < -400
    );

    return isSameAltitude.length >= 2;
  }

  return false;
};

const setWeights = (state: State) => {
  state.acars.fuel.block = state.acars.fuel.total;
  state.acars.weight.zfw = state.sim.weight.zfw;
};

export const checkFlightPhase = async (state: State) => {
  const isOnGround = state.sim.onGround === 1;
  const isGearDown = state.acars.gearState === GearState.DOWN;
  const isClimbing = checkClimbing(state);
  const isDescent = checkDescent(state);
  const isGroundState =
    state.acars.flightPhase === FlightPhase.INITIALIZED ||
    state.acars.flightPhase === FlightPhase.BOARDING ||
    state.acars.flightPhase === FlightPhase.PUSHBACK ||
    state.acars.flightPhase === FlightPhase.TAXI ||
    state.acars.flightPhase === FlightPhase.TAKE_OFF ||
    state.acars.flightPhase === FlightPhase.LANDED ||
    state.acars.flightPhase === FlightPhase.ARRIVED;
  const isEngineOn = !!state.acars.engines.find((engine) => engine === 1);
  let currentFlightPhase = null;
  let trackEvent = null;

  if (state.acars.init === true && !isOnGround) {
    currentFlightPhase = FlightPhase.ENROUTE;
  }

  if (state.acars.init === true && isOnGround) {
    currentFlightPhase = FlightPhase.BOARDING;
  }

  if (
    state.acars.flightPhase === FlightPhase.BOARDING &&
    state.acars.groundSpeed > 3 &&
    isGearDown &&
    isOnGround
  ) {
    currentFlightPhase = FlightPhase.PUSHBACK;
    setWeights(state);
    pushToLogs(state, 'Pushback started', true, false);
  }

  if (
    state.acars.flightPhase === FlightPhase.PUSHBACK &&
    state.acars.groundSpeed > 10 &&
    isGearDown &&
    isOnGround
  ) {
    currentFlightPhase = FlightPhase.TAXI;
    pushToLogs(state, 'Taxi', true, true);
  }

  if (
    state.acars.flightPhase === FlightPhase.TAXI &&
    state.acars.groundSpeed > 50 &&
    isGearDown &&
    isOnGround
  ) {
    currentFlightPhase = FlightPhase.TAKE_OFF;

    pushToLogs(state, 'Taking off', true, true);
  }

  if (
    !isOnGround &&
    isClimbing &&
    state.acars.flightPhase !== FlightPhase.CLIMB
  ) {
    currentFlightPhase = FlightPhase.CLIMB;
    pushToLogs(state, 'Climbing', true, true);
  }

  if (
    (state.acars.flightPhase === FlightPhase.CLIMB ||
      state.acars.flightPhase === FlightPhase.DESCENT) &&
    !isClimbing &&
    !isDescent
  ) {
    currentFlightPhase = FlightPhase.ENROUTE;
    pushToLogs(state, 'Enroute', true, true);
  }

  if (
    !isOnGround &&
    isDescent &&
    state.acars.flightPhase !== FlightPhase.FINAL_APPROACH &&
    state.acars.flightPhase !== FlightPhase.DESCENT
  ) {
    currentFlightPhase = FlightPhase.DESCENT;
    pushToLogs(state, 'Descent', true, true);
  }

  if (
    (state.acars.flightPhase === FlightPhase.DESCENT ||
      state.acars.flightPhase === FlightPhase.GO_AROUND) &&
    isGearDown &&
    !isOnGround &&
    state.acars.ias < 220
  ) {
    currentFlightPhase = FlightPhase.FINAL_APPROACH;
    pushToLogs(state, 'Final Approach', true, true);
  }

  if (
    state.acars.flightPhase === FlightPhase.FINAL_APPROACH &&
    !isGearDown &&
    isClimbing
  ) {
    currentFlightPhase = FlightPhase.GO_AROUND;
  }

  if (!isGroundState && isOnGround) {
    state.acars.landing_rate = calculateLandingRate(state);
    // calculateGForce(state);
    trackEvent = EventType.LANDING;

    currentFlightPhase = FlightPhase.LANDED;
    pushToLogs(state, 'Landed', true, true);
  }

  if (
    state.acars.flightPhase === FlightPhase.LANDED &&
    isOnGround &&
    !isEngineOn
  ) {
    currentFlightPhase = FlightPhase.ARRIVED;
    pushToLogs(state, 'Arrived', true, true);
  }

  if (
    state.acars.flightPhase !== currentFlightPhase &&
    currentFlightPhase !== null
  ) {
    state.acars.flightPhase = currentFlightPhase;
    const response = await trackerService.sendEvent(
      state.trackerId,
      state,
      EventType.FLIGHT_PHASE
    );

    if (trackEvent) {
      await trackerService.sendEvent(state.trackerId, state, trackEvent);
      trackEvent = null;
    }
  }
};
