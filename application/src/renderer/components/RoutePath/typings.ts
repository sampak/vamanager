import { LatLngBoundsExpression } from 'leaflet';
import { PirepRoute } from '@shared/base/PirepRoute';
import Airport from '@shared/base/Airport';
export type { FC } from 'react';

export interface Props {
  route: PirepRoute[];
  origin?: Airport;
  destination?: Airport;
  color?: string;
}
