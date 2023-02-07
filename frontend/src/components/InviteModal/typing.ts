export type { FC } from 'react';

export interface Props {
  open: boolean;
  error?: string;
  setOpen: (value: boolean) => void;
  handleSendInvite: (email: string) => void;
  isDisabled: boolean;
}
