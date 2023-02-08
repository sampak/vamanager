export type { FC } from 'react';

export interface Props {
  isOpen: boolean;
  toggle: (value: boolean) => void;
  title: string;
  text: string;
  acceptText: string;
  cancelText: string;
  onAccept: () => void;
  onCancel: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
}
