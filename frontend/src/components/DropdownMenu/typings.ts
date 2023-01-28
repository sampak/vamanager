export type { FC } from 'react';

export interface Props {
  className?: string;
  isOpen: boolean;
  options: {
    text: string;
    onClick: () => void;
  }[];
  toggle?: (value: boolean) => void;
}
