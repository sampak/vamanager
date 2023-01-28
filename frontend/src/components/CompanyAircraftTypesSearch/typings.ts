import TypeOfAircraft from '@shared/base/TypeOfAircraft';

export type { FC } from 'react';

export interface Props {
  label?: string;
  placeholder?: string;
  onChange: (airport: TypeOfAircraft) => void;
}
