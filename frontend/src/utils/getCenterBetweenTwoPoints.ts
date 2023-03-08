import { LatLngExpression } from 'leaflet';
import { toDegrees } from './toDegrees';
import { toRadians } from './toRadians';

export const getCenterBetweenTwoPoints = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): LatLngExpression => {
  const R = 6371; // promień Ziemi w km
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const lat1Rad = toRadians(lat1);
  const lat2Rad = toRadians(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) *
      Math.sin(dLon / 2) *
      Math.cos(lat1Rad) *
      Math.cos(lat2Rad);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const lat = toDegrees((lat1Rad + lat2Rad) / 2);
  const lon =
    lon1 + dLon > 180
      ? -180 + (((lon1 + lon2) / 2 - 180) % 180)
      : (lon1 + lon2) / 2;

  return [lat, lon];
};
