export type { FC } from 'react';
import AircraftDealer from '@shared/base/AircraftDealer';

export interface Props {
  aircraft: AircraftDealer;
  onClick: (aircraft: AircraftDealer, registration: string) => Promise<boolean>;
  isFetching: boolean;
}
