export type { FC } from 'react';

export interface Props {
  isOpen: boolean;
  options: {
    text: string;
    onClick: () => void;
  }[];
  toggle?: (value: boolean) => void;
}
