import { LatLngExpression } from 'leaflet';
import { RefObject } from 'react';

export type { FC } from 'react';

export interface Props {
  zoom?: number;
  children?: JSX.Element;
  className?: string;
  center?: LatLngExpression;
  mapRef: RefObject<L.Map>;
}
