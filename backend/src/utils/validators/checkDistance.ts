import { getDistance } from 'geolib';

interface IPosition {
  lat: number;
  lng: number;
}

export const checkDistance = (
  aircraftPosition: IPosition,
  destination: IPosition,
  maxDistance: number
) => {
  const distanceToDestination = getDistance(
    { latitude: aircraftPosition.lat, longitude: aircraftPosition.lng },
    {
      latitude: destination.lat,
      longitude: destination.lng,
    }
  );

  if (distanceToDestination > maxDistance) {
    return false;
  }
  return true;
};
