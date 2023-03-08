import { Pireps, Tracker } from '@prisma/client';
import { EventType } from '@shared/base/EventType';

export const calculateFuelUsed = (pirep: Pireps, tracker: Tracker[]) => {
  const FOB = pirep.blockFuel;
  const submit_event = tracker.find(
    (event) => event.eventType === EventType.FLIGHT_ENDED
  );

  return FOB - submit_event.fuel;
};
