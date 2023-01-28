import { Aircrafts, TypeOfAircraft } from '@prisma/client';
import Aircraft from '@shared/base/Aircraft';

const prismaAircraftToAircraft = (
  aircraft: Aircrafts & { type: TypeOfAircraft }
): Aircraft => {
  return {
    id: aircraft.id,
    airlineId: aircraft.airlineId,
    image: aircraft.image,
    registration: aircraft.registration,
    typeId: aircraft.type.id,
    type: aircraft.type,
    miles: aircraft.miles,
    minutes: aircraft.minutes,
    createdAt: aircraft.createdAt,
  };
};

export default prismaAircraftToAircraft;
