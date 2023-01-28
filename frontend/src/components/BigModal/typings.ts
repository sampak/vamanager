export type { FC } from 'react';

export interface Props {
  isCloseButton?: boolean;
  isOpen: boolean;
  handleClose: (state: boolean) => void;
  children: JSX.Element;
}
