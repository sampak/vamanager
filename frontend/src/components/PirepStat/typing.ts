import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type { FC } from 'react';

export interface Props {
  placeholder?: string;
  text?: string;
  icon: IconDefinition;
  headerText: string;
  children?: JSX.Element;
}
