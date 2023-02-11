export type { FC } from 'react';
import Schedule from '@shared/base/Schedule';
export interface Props {
  schedule: Schedule;
  removeSchedule: (scheduleID: string) => void;
  setBookSchedule: (schedule: Schedule) => void;
  setIsBookModal: (value: boolean) => void;
}
