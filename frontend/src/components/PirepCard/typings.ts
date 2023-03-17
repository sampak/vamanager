export type { FC } from 'react';
import { Pirep } from '@shared/base/Pirep';
export interface Props {
  pirep: Pirep;
  disableShow?: boolean;
  // removeSchedule: (scheduleID: string) => void;
  // setBookSchedule: (schedule: any) => void;
  // setIsBookModal: (value: boolean) => void;
}
