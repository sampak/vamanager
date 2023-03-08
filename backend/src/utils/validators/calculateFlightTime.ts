import { Pireps, Tracker } from '@prisma/client';
import * as moment from 'moment';

export const calculateFlightTime = (tracker: Tracker[]) => {
  return moment(tracker.at(tracker.length - 1).createdAt).diff(
    tracker.at(0).createdAt,
    'seconds'
  );
};
