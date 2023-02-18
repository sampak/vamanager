import { Pirep } from '@shared/base/Pirep';
export type { FC } from 'react';

export interface Props {
  pirep: Pirep;
  onClick: (pirep: Pirep) => void;
  isLoading: boolean;
  isDisabled: boolean;
}
