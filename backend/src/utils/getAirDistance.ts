import { Tracker, type_of_tracker } from '@prisma/client';
import { getDistance } from 'geolib';

export const getAirDistance = (tracker: Tracker[]) => {
  const points = tracker
    .filter((tracker) => tracker.type === type_of_tracker.TRACKER)
    .map((tracker) => ({
      latitude: tracker.lat,
      longitude: tracker.lng,
    }));

  let totalDistance = 0;

  const startPoint = points[0];
  const endPoint = points[points.length + 1];

  for (let i = 0; i < points.length - 1; i++) {
    const startPoint = points[i];
    const endPoint = points[i + 1];
    const distanceInMeters = getDistance(startPoint, endPoint);
    totalDistance += distanceInMeters;
  }

  return totalDistance / 1852;
};
