import { toRadians } from './toRadians';

export const calculateZoom = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
  mapWidth: number
) => {
  const GLOBE_WIDTH = 256;
  const angle = lng1 - lng2;
  let mapZoom = Math.round(
    Math.log((mapWidth * 360) / angle / GLOBE_WIDTH) / Math.LN2
  );
  const latDiff = Math.abs(lat1 - lat2);
  const lngDiff = Math.abs(lng1 - lng2);
  const latZoom = Math.round(Math.log(360 / latDiff) / Math.LN2);
  const lngZoom = Math.round(Math.log(360 / lngDiff) / Math.LN2);
  mapZoom = Math.min(mapZoom, latZoom, lngZoom);
  if (isNaN(mapZoom)) {
    mapZoom = 6;
  }

  return mapZoom;
};
