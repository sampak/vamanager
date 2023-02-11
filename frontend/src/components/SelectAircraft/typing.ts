import Aircraft from '@shared/base/Aircraft';

export type { FC } from 'react';

export interface Props {
  aircraftType: string;
  label?: string;
  placeholder?: string;
  onChange: (aircraft: Aircraft) => void;
}
