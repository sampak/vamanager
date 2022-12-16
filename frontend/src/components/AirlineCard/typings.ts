import Airline from '@shared/base/Airline';

export type { FC } from 'react';

export interface Props {
  airline: Airline;
  onClick: (airline: Airline) => void;
}
