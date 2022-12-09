import { InputHTMLAttributes } from 'react';

export type { FC } from 'react';

export interface Props extends InputHTMLAttributes<any> {
  label?: string;
  checked: boolean;
  onCheck: (value) => void;
}
