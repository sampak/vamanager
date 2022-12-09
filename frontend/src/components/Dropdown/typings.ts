import { InputHTMLAttributes } from 'react';

export type { FC } from 'react';

export interface DropdownOption {
  value: string;
  text: string;
}

export interface Props extends InputHTMLAttributes<any> {
  label?: string;
  placeholder?: string;
  value: string;
  error?: string;
  onChangeValue: (value: DropdownOption) => void;
  options: DropdownOption[];
}
