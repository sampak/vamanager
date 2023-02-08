import { AircraftsDealer } from '@prisma/client';

export const getSellAircraftCost = (aircraftDealer: AircraftsDealer) => {
  return aircraftDealer.cost * 0.7;
};
