import { OnbordingStep } from 'components/OnbordingHeader/typings';
import { OnbordingValues } from 'modules/Onbording/typings';

export type { FC } from 'react';
export interface Props {
  image: string;
  selectedAirport: string;
  setSelectedAirport: (value: string) => void;
  details: OnbordingValues | undefined;
  steps: OnbordingStep[];
  options: any;
}
