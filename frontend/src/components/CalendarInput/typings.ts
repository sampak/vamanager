export type { FC } from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface Props {
  label?: string;
  onChange: (date: Date) => void;
}
