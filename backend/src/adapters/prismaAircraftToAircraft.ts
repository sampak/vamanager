import { Aircrafts, Memberships, TypeOfAircraft, Users } from '@prisma/client';
import Aircraft from '@shared/base/Aircraft';
import { AuthedUser } from 'src/dto/AuthedUser';
import getAircraftConfiguration from 'src/ui-configuration/aircraft';

const prismaAircraftToAircraft = (
  aircraft: Aircrafts & { type: TypeOfAircraft },
  currentUser?: AuthedUser
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
    uiConfiguration: getAircraftConfiguration(aircraft, currentUser),
  };
};

export default prismaAircraftToAircraft;
