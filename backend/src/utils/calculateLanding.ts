import { Tracker, type_of_tracker } from '@prisma/client';
import { LandingScore } from '@shared/base/LandingScore';

import { EventType } from '@shared/base/EventType';

export const calculateLanding = (tracker: Tracker[]): LandingScore => {
  const landingEvent = tracker.find(
    (tracker) =>
      tracker.type === type_of_tracker.EVENT &&
      tracker.eventType === EventType.LANDING
  );

  const landing_rate = landingEvent?.landing_rate ?? 0;

  if (landing_rate <= 350) {
    return LandingScore.PERFECT;
  } else if (landing_rate >= 350 && landing_rate <= 800) {
    LandingScore.GOOD;
  } else if (landing_rate >= 800) {
    return LandingScore.BAD;
  }
};
