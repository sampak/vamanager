import { JoiningMethod } from '@shared/base/JoiningMethod';

export interface OnbordingValues {
  name: string;
  icao: string;
  description: string;
  joiningMethod: JoiningMethod;
}
