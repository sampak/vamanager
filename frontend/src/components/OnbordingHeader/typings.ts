export type { FC } from 'react';

export interface OnbordingStep {
  label: string;
}

export interface Props {
  title?: string;
  subTitle?: string;
  steps: OnbordingStep[];
  activeStep: number;
}
