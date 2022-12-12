import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type { FC } from 'react';

export interface Props {
  icon: IconDefinition;
  label: string;
  onClick: () => void;
}
