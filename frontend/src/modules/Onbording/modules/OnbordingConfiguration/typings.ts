import { OnbordingStep } from 'components/OnbordingHeader/typings';
import { OnbordingValues } from 'modules/Onbording/typings';

export type { FC } from 'react';

export interface Props {
  initialValues: OnbordingValues;
  steps: OnbordingStep[];
  image: string | undefined;
  setImage: (value: string) => void;
}
