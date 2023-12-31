import {
  Aircrafts,
  Airlines,
  Airports,
  Memberships,
  Pireps,
  PirepsRoute,
  pirep_status,
  Tracker,
  TypeOfAircraft,
  Users,
} from '@prisma/client';
import { Pirep } from '@shared/base/Pirep';
import { Tracker as SharedTracker } from '@shared/base/Tracker';
import { PirepRoute } from '@shared/base/PirepRoute';
import { PirepStatus } from '@shared/base/PirepStatus';
import prismaAircraftToAircraft from './prismaAircraftToAircraft';
import PrismaUserToUser from './prismaUserToUser';
import prismaAirlineToAirline from './prismaAirlineToAirline';
import { estimateSalary } from 'src/utils/schedule';
import { convertScoreToFlightRating } from 'src/utils/convertScoreToFlightRating';

const prismaPirepToPirep = (
  pirep: Pireps & {
    pilot?: Users;
    airline?: Airlines;
    route?: PirepsRoute[];
    origin?: Airports;
    destination?: Airports;
    aircraft?: Aircrafts & { type: TypeOfAircraft };
  },
  tracker?: Tracker[]
): Pirep => {
  const isPirepSubmitted = pirep.status !== pirep_status.CREATED;
  const flightRating = convertScoreToFlightRating(pirep.score);

  return {
    id: pirep.id,
    callsign: pirep.callsign,
    flightNumber: pirep.flightNumber,
    estimatedFuel: pirep.estimatedFuel,
    blockFuel: pirep.blockFuel,
    estminatedAirDistance: pirep.estminatedAirDistance,
    airDistance: pirep.airDistance,
    passangers: pirep.passangers,
    estimatedFlightTime: pirep.estimatedFlightTime,
    takeoffTime: pirep.takeoffTime,
    landingTime: pirep.landingTime,
    dx_rmk: pirep.dx_rmk,
    flightplanText: pirep.flightplanText,
    routeText: pirep.routeText,
    remarks: pirep.remarks,
    est_zfw: pirep.est_zfw,
    est_tow: pirep.est_tow,
    orig_metar: pirep.orig_metar,
    orig_taf: pirep.orig_taf,
    dest_metar: pirep.dest_metar,
    dest_taf: pirep.dest_taf,
    altn_metar: pirep.altn_metar,
    altn_taf: pirep.altn_taf,
    pilot_notes: pirep.pilot_notes,
    plan_html: pirep.plan_html,
    originId: pirep.originId,
    route: pirep.route as PirepRoute[],
    pilot: pirep.pilot && PrismaUserToUser(pirep.pilot),
    pilotId: pirep.pilotId,
    airlineId: pirep.airlineId,
    airline: pirep.airline && prismaAirlineToAirline(pirep.airline),
    origin: pirep.origin,
    destination: pirep.destination,
    aircraftId: pirep.aircraftId,
    aircraft: pirep.aircraft && prismaAircraftToAircraft(pirep.aircraft),
    status: pirep.status as PirepStatus,
    zfw: pirep.zfw,
    tow: pirep.tow,
    units: pirep.units,
    destinationId: pirep.destinationId,
    flightTime: pirep.flightTime,
    tracker: tracker ? (tracker as SharedTracker[]) : [],
    flightRating: isPirepSubmitted && flightRating,
    ivaoLink: pirep.ivaoLink,
    vatsimLink: pirep.vatsimLink,
    createdAt: pirep.createdAt,
    landing_rate: pirep.landing_rate,
    fuel_burned: pirep.fuel_burned,
    salary: isPirepSubmitted
      ? pirep.salary
      : estimateSalary(
          pirep.estminatedAirDistance,
          pirep.passangers,
          pirep.estimatedFuel
        ),
  };
};

export default prismaPirepToPirep;
