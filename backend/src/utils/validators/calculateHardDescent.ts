import { Tracker } from '@prisma/client';
import { COMPANY_POINTS } from 'src/config/constants';

export const calculateHardDescent = (tracker: Tracker[]) => {
  const hardDescent = tracker.filter((tracker) => tracker.vs > 4000).length;
  return hardDescent * COMPANY_POINTS.HARD_DESCENT;
};
