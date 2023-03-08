import { LatLngBoundsExpression } from 'leaflet';
import { PirepRoute } from '@shared/base/PirepRoute';
import Airport from '@shared/base/Airport';
import { Tracker } from '@shared/base/Tracker';
export type { FC } from 'react';

export interface Props {
  route?: PirepRoute[];
  origin?: Airport;
  destination?: Airport;
  color?: string;
  tracker?: Tracker[];
}
