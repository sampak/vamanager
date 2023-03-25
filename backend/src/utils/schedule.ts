import { Airports, Schedules, TypeOfAircraft } from '@prisma/client';
import { Pirep } from '@shared/base/Pirep';
import { getRandomNumber } from './getRandomNumber';
import { randomIntFromInterval } from './randomIntFromInterval';
import { calculateLandingOnDestination } from './validators/calculateLandingOnDestination';

const ticketCost = 85;
const fuelCost = 2;

const chanceForAdditionalPayments = 0.4;
const additionalPayments = [10, 45];

export const calculatePasssangerProfit = (
  passangers: number,
  ticketCost: number,
  multiplier: number,
  withAdditionalPayments = false
) => {
  if (withAdditionalPayments) {
    const payments = [];
    for (let i = 0; i < passangers; i++) {
      if (Math.random() <= chanceForAdditionalPayments) {
        payments.push(
          ticketCost +
            getRandomNumber(additionalPayments[0], additionalPayments[1])
        );
        continue;
      }
      payments.push(ticketCost);
    }

    const sum = payments.reduce((prev, ticket) => prev + ticket, 0);

    return sum * multiplier;
  }
  return ticketCost * passangers * multiplier;
};

export const calculateFuelCost = (fuel: number, fuelCost: number) => {
  return fuel * fuelCost;
};

export const calculateAirMultiplier = (airDistance: number) => {
  const maxMultiplier = airDistance > 2000 ? 2.8 : 3.5;

  const percent = (airDistance / 5000) * 100;
  return 1 + (percent > 100 ? 100 : percent * maxMultiplier) / 100;
};

export const estimateSalary = (
  airDistance: number,
  estimatedPassangers: number,
  estimatedFuel: number,
  onDestination?: boolean,
  withAdditionalPayments?: boolean
): number => {
  const multiplier = calculateAirMultiplier(airDistance);
  const passangersProfit = calculatePasssangerProfit(
    estimatedPassangers,
    ticketCost,
    multiplier,
    withAdditionalPayments
  );
  const fuel = calculateFuelCost(estimatedFuel, fuelCost);

  let onDestinationProfit = 0;

  if (onDestination === false) {
    onDestinationProfit =
      passangersProfit * 2 + randomIntFromInterval(1000, 5000);
  }

  const salary = passangersProfit - fuel - onDestinationProfit;
  return Math.floor(salary);
};
