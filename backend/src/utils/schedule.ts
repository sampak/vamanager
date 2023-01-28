import { Airports, Schedules, TypeOfAircraft } from '@prisma/client';

const ticketCost = 150;
const fuelCost = 2;

export const calculateAirMultiplier = (airDistance: number) => {
  const maxMultiplier = airDistance > 2000 ? 2.8 : 3.5;

  const percent = (airDistance / 5000) * 100;
  return (percent > 100 ? 100 : percent * maxMultiplier) / 100;
};

export const estimateSalary = (
  schedule: Schedules & {
    origin?: Airports;
    destination?: Airports;
    type_of_aircraft?: TypeOfAircraft;
  }
): number => {
  const multiplier = calculateAirMultiplier(schedule.airDistance);
  const passangersProfit =
    ticketCost * schedule.estimatedPassangers * multiplier;
  const fuel = schedule.estimatedFuel * fuelCost;

  const salary = passangersProfit - fuel;
  return Math.floor(salary);
};
