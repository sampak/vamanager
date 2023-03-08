import { Airports, Schedules, TypeOfAircraft } from '@prisma/client';
import { Pirep } from '@shared/base/Pirep';
import { randomIntFromInterval } from './randomIntFromInterval';
import { calculateLandingOnDestination } from './validators/calculateLandingOnDestination';

const ticketCost = 150;
const fuelCost = 2;

export const calculateAirMultiplier = (airDistance: number) => {
  const maxMultiplier = airDistance > 2000 ? 2.8 : 3.5;

  const percent = (airDistance / 5000) * 100;
  return (percent > 100 ? 100 : percent * maxMultiplier) / 100;
};

export const estimateSalary = (
  airDistance: number,
  estimatedPassangers: number,
  estimatedFuel: number,
  onDestination?: boolean
): number => {
  const multiplier = calculateAirMultiplier(airDistance);
  const passangersProfit = ticketCost * estimatedPassangers * multiplier;
  const fuel = estimatedFuel * fuelCost;

  let onDestinationProfit = 0;

  if (onDestination === false) {
    onDestinationProfit =
      passangersProfit * 2 + randomIntFromInterval(1000, 5000);
  }

  const salary = passangersProfit - fuel - onDestinationProfit;
  return Math.floor(salary);
};
