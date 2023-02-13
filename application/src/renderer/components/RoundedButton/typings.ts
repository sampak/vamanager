export type { FC } from 'react';

export interface Props {
  type?: 'reset' | 'button' | 'submit';
  children: JSX.Element | string;
  className?: string;
  outline?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
}
