export type { FC } from 'react';

export interface Props {
  isOpen: boolean;
  toggle: (value: boolean) => void;
  refetchSchedules: () => void;
}
