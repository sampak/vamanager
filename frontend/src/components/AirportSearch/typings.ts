import Airport from '@shared/base/Airport';

export type { FC } from 'react';

export interface Props {
  label?: string;
  placeholder?: string;
  onChange: (airport: Airport) => void;
}
