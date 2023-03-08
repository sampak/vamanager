import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type { FC } from 'react';

export interface Props {
  icon?: IconDefinition;
  text: string;
  isHidable?: boolean;
  isShowed?: boolean;
  onClick?: () => void;
}
