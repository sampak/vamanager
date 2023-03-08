import { CONSTS, State } from './typings';
import { pushToLogs } from './utils';
import { EventType } from '@shared/base/EventType';
import trackerService from '../api/trackerService';

export const checkEngines = async (state: State) => {
  const engine_one = state.sim.engines[0];
  const engine_two = state.sim.engines[1];

  const engine_one_is_running = engine_one > CONSTS.ENGINE_ON;
  const engine_two_is_running = engine_two > CONSTS.ENGINE_ON;

  let isEvent = false;

  if (state.acars.engines[0] === 0 && engine_one_is_running) {
    state.acars.engines[0] = 1;
    if (!state.acars.init) {
      isEvent = true;
      pushToLogs(state, 'Engine one started.', true, false);
    }
  }

  if (state.acars.engines[0] === 1 && !engine_one_is_running) {
    state.acars.engines[0] = 0;
    if (!state.acars.init) {
      isEvent = true;
      pushToLogs(state, 'Engine one stopped.', true, false);
    }
  }

  if (state.acars.engines[1] === 0 && engine_two_is_running) {
    if (!state.acars.init) {
      isEvent = true;
      pushToLogs(state, 'Engine two started.', true, false);
    }
    state.acars.engines[1] = 1;
  }

  if (state.acars.engines[1] === 1 && !engine_two_is_running) {
    if (!state.acars.init) {
      isEvent = true;
      pushToLogs(state, 'Engine two stopped.', true, false);
    }
    state.acars.engines[1] = 0;
  }

  if (!state.acars.init && isEvent) {
    console.log('Tracking Engine event');
    await trackerService.sendEvent(
      state.trackerId,
      state,
      EventType.START_ENGINE
    );
  }
};
