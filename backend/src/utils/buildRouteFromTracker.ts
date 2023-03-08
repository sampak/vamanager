import { Tracker, type_of_tracker } from '@prisma/client';
import * as moment from 'moment';
export const buildRouteFromTracker = async (prismaTrackers: Tracker[]) => {
  let route = [];
  let lastRoute = null;
  return (route = prismaTrackers.filter((tracker) => {
    if (lastRoute === null) {
      lastRoute = tracker;
      return tracker;
    }

    const diff = moment(tracker.createdAt).diff(lastRoute.createdAt, 'seconds');

    if (diff >= 45 || tracker.type === type_of_tracker.EVENT) {
      lastRoute = tracker;
      return tracker;
    }
  }));
};
