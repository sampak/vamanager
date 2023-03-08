import { Pireps, Tracker } from '@prisma/client';
import * as moment from 'moment';
import { COMPANY_POINTS, ONE_HOUR } from 'src/config/constants';
import { calculateFlightTime } from './calculateFlightTime';

export const calculateLandingOnTime = (pirep: Pireps, tracker: Tracker[]) => {
  const estimatedFlightTime = pirep.estimatedFlightTime;
  const flightTime = calculateFlightTime(tracker);
  const diff = flightTime - estimatedFlightTime;

  if (diff > ONE_HOUR) {
    return COMPANY_POINTS.DELAYED;
  } else {
    return COMPANY_POINTS.LANDING_ON_TIME;
  }
};
