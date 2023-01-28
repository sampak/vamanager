import { Airports, Schedules, TypeOfAircraft } from '@prisma/client';
import Schedule from '@shared/base/Schedule';
import { TypeOfSchedule } from '@shared/base/TypeOfSchedule';
import { estimateSalary } from 'src/utils/schedule';

const prismaScheduleToSchedule = (
  schedule: Schedules & {
    origin?: Airports;
    destination?: Airports;
    type_of_aircraft?: TypeOfAircraft;
  }
): Schedule => {
  return {
    id: schedule.id,
    airlineId: schedule.airlineId,
    originId: schedule.originId,
    destinationId: schedule.destinationId,
    typeOfAircraftId: schedule.typeOfAircraftId,
    type: schedule.type as TypeOfSchedule,
    callsign: schedule.callsign,
    flightNumber: schedule.flightNumber,
    flightTime: schedule.flightTime,
    day: schedule.day,
    origin: schedule?.origin,
    destination: schedule?.destination,
    typeOfAircraft: schedule?.type_of_aircraft,
    airDistance: schedule.airDistance,
    recommendedRoute: schedule.recommendedRoute,
    costIndex: schedule.costIndex,
    salary: estimateSalary(schedule),
  };
};

export default prismaScheduleToSchedule;
