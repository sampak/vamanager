import { State } from './typings';
import { pushToLogs } from './utils';
import { EventType } from '@shared/base/EventType';
import trackerService from '../api/trackerService';
export const checkGears = async (state: State) => {
  const gearState = state.sim.gearState;

  if (state.acars.gearState !== gearState) {
    state.acars.gearState = gearState;

    if (!state.acars.init) {
      pushToLogs(state, `Gear position changed to ${gearState}`, true, false);
      await trackerService.sendEvent(
        state.trackerId,
        state,
        EventType.GEAR_STATE
      );
    }
  }
};
