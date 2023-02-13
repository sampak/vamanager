import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { RefObject, InputHTMLAttributes } from 'react';

export type { FC } from 'react';

export interface Props extends InputHTMLAttributes<any> {
  icon?: IconDefinition;
  label?: string;
  placeholder?: string;
  value: string;
  error?: string;
  fref?: RefObject<HTMLInputElement>;
}
