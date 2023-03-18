import { Airports, Pireps, Tracker } from '@prisma/client';

import { RequestTrackingDTO } from '@shared/dto/RequestTrackingDTO';
import { COMPANY_POINTS } from 'src/config/constants';
import { LandingScore } from '@shared/base/LandingScore';

import { calculateLanding } from './calculateLanding';
import { calculateHardDescent } from './validators/calculateHardDescent';
import { calculateLandingOnTime } from './validators/calculateLandingOnTime';
import { calculateLandingOnDestination } from './validators/calculateLandingOnDestination';

export const calculateCompanyScore = (
  payload: RequestTrackingDTO,
  pirep: Pireps & { destination: Airports },
  tracker: Tracker[]
) => {
  let score = 0;

  const pointsForCorrectDestination = calculateLandingOnDestination(
    payload,
    pirep
  );

  score += calculateHardDescent(tracker);
  score += pointsForCorrectDestination;
  if (pointsForCorrectDestination > 0) {
    score += calculateLandingOnTime(pirep, tracker);
  }
  const landingScore: LandingScore = calculateLanding(tracker);

  switch (landingScore) {
    case LandingScore.PERFECT:
      score += COMPANY_POINTS.PERFECT_LANDING;
    case LandingScore.GOOD:
      score += COMPANY_POINTS.GOOD_LANDING;
    case LandingScore.PERFECT:
      score += COMPANY_POINTS.BAD_LANDING;
    default:
      score += 0;
  }

  return score;
};
