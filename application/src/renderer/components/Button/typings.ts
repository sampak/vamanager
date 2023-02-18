export type { FC } from 'react';

export interface Props {
  children: JSX.Element | string;
  className?: string;
  outline?: boolean;
  onClick?: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
}
