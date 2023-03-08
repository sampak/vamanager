import { BadRequestException } from '@nestjs/common';
import { pirep_status, PrismaClient } from '@prisma/client';
import { getDistance } from 'geolib';
import { AuthedUser } from 'src/dto/AuthedUser';
import { RequestTrackingDTO } from '@shared/dto/RequestTrackingDTO';
import { findTypeFromAlias } from 'src/aliases/aircrafts';

export const canTrackValidator = async (
  prisma: PrismaClient,
  airlineId: string,
  trackId,
  currentUser: AuthedUser,
  payload: RequestTrackingDTO
) => {
  const company = await prisma.airlines.findFirst({
    where: {
      icao: airlineId,
    },
  });

  if (!company) {
    return {
      pirep: null,
      company: true,
      distanceToDestination: 0,
      valid: false,
    };
  }

  const pirep = await prisma.pireps.findFirst({
    where: {
      airlineId: company.id,
      pilotId: currentUser.id,
      trackerId: trackId,
    },
    include: {
      aircraft: {
        include: {
          type: true,
        },
      },
      origin: true,
      destination: true,
    },
  });

  if (!pirep) {
    return {
      pirep: pirep,
      pirepValid: false,
      distanceToDestination: null,
      valid: false,
    };
  }

  const distanceToDestination = getDistance(
    { latitude: payload.lat, longitude: payload.lng },
    { latitude: pirep.destination.lat, longitude: pirep.destination.lng }
  );

  if (distanceToDestination > 10000) {
    console.log(
      'Pirep status changed to AWAITING_VALIDATION due to distance to destination ' +
        distanceToDestination
    );

    return {
      pirep: pirep,
      distanceToDestination: distanceToDestination,
      distance: true,
      valid: false,
    };
  }

  const findedAircraftType = findTypeFromAlias(payload.type);
  console.log(
    'Aircraft Model: ' + payload.type + ' alias ' + findedAircraftType
  );

  if (findedAircraftType !== pirep.aircraft.type.type) {
    console.log(
      'Pirep status changed to AWAITING_VALIDATION due to aircraft type ' +
        pirep.aircraft.type.type
    );

    return {
      pirep: pirep,
      aircraftType: true,
      distanceToDestination: distanceToDestination,
      valid: false,
    };
  }

  return {
    pirep: pirep,
    distanceToDestination: distanceToDestination,
    valid: true,
  };
};
