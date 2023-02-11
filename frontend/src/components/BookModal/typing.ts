import Schedule from '@shared/base/Schedule';

export type { FC } from 'react';

export interface Props {
  isOpen: boolean;
  setToggle: (value: boolean) => void;
  schedule: Schedule | null;
}
