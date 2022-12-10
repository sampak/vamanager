import { OnbordingStep } from 'components/OnbordingHeader/typings';
import { OnbordingValues } from 'modules/Onbording/typings';

export type { FC } from 'react';

export interface Props {
  keys: string[];
  options: boolean[];
  setOptions: (values: boolean[]) => void;
  details: OnbordingValues | undefined;
  steps: OnbordingStep[];
}
