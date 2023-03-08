import { Pirep } from '@shared/base/Pirep';
import { Acars } from '../main/simConnect/typings';

export interface Tracker {
  canTrack?: boolean;
  pirep: Pirep;
  acars: Acars;
  trackerId: string;
  distance: number;
}
