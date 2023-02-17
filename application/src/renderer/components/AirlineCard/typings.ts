import Airline from '@shared/base/Airline';
import { Membership } from '@shared/base/Membership';

export type { FC } from 'react';

export interface Props {
  membership?: Membership;
  choose?: boolean;
  airline: Airline;
  onClick: (airline: Airline) => void;
}
