export type { FC } from 'react';
export interface Props {
  disabled?: boolean;
  text: string;
  className?: string;
  onClick?: () => void;
}
