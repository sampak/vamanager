export type { FC } from 'react';

export interface Props {
  className?: string;
  options: ({
    text: string;
    onClick: () => void;
  } | null)[];
}
