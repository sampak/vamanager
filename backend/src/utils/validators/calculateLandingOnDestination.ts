import { checkDistance } from './checkDistance';
import { RequestTrackingDTO } from '@shared/dto/RequestTrackingDTO';
import { Airports, Pireps } from '@prisma/client';
import { COMPANY_POINTS } from 'src/config/constants';

export const calculateLandingOnDestination = (
  payload: RequestTrackingDTO,
  pirep: Pireps & { destination: Airports }
) => {
  const isCorrectDestination = checkDistance(payload, pirep.destination, 10000);

  if (isCorrectDestination === false) {
    return COMPANY_POINTS.LANDING_ON_ANOTHER_AIRPORT;
  }

  if (isCorrectDestination === true) {
    return COMPANY_POINTS.LANDING_ON_DESTINATION;
  }
};
