import { InputHTMLAttributes } from 'react';

export type { FC } from 'react';

export interface DropdownOption {
  value: string | number;
  text: string;
}

export interface Props extends InputHTMLAttributes<any> {
  label?: string;
  placeholder?: string;
  value: string | number;
  error?: string;
  onChangeValue: (value: DropdownOption) => void;
  options: DropdownOption[];
}
