export type { FC } from 'react';
import Aircraft from '@shared/base/Aircraft';

export interface Props {
  refetchAircrafts: () => void;
  aircraft: Aircraft;
  setError: (value: string) => void;
}
