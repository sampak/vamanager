import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type { FC } from 'react';

export interface Option {
  icon: IconDefinition;
  title: string;
  active: boolean;
  className?: string;
  onClick: () => void;
}

export interface Props {
  className?: string;
  icon: IconDefinition;
  title: string;
  firstExperience: boolean;
  options: Option[];
}
