import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  flight_phase,
  gear_state,
  Pireps,
  pirep_status,
  type_of_tracker,
} from '@prisma/client';
import * as moment from 'moment';
import { getDistance } from 'geolib';
import { AuthedUser } from 'src/dto/AuthedUser';
import { PrismaService } from 'src/prisma.service';
import { v4 as uuid } from 'uuid';
import { RequestTrackingDTO } from '@shared/dto/RequestTrackingDTO';
import { findTypeFromAlias } from 'src/aliases/aircrafts';
import { EventType } from '@shared/base/EventType';
import { canTrackValidator } from 'src/utils/canTrackValidator';
import { FlightPhase } from '@shared/base/FlightPhase.enum';
import { ERROR_CODES } from 'src/config/constants';
import { checkAircraftType } from 'src/utils/validators/checkAircraftType ';
import { checkDistance } from 'src/utils/validators/checkDistance';
import { calculateCompanyScore } from '../utils/calculateCompanyScore';
import { estimateSalary } from 'src/utils/schedule';
import { calculateFuelUsed } from 'src/utils/validators/calculateFuelUsed';
import { DefaultResponse, IKeys } from '@shared/dto/DefaultResponse';
import { calculateAicraftDamage } from 'src/utils/validators/calculateAircraftDamage';
import { calculateFlightTime } from 'src/utils/validators/calculateFlightTime';
import { getAirDistance } from 'src/utils/getAirDistance';
import emails from 'src/utils/emails';
import { PirepEmail } from '@shared/emails/Pirep.email';
import { config } from 'src/config';
import loggerService from 'src/services/loggerService';

@Injectable()
export class TrackerService {
  constructor(private readonly prismaService: PrismaService) {}

  async insertEvent(
    pirep: Pireps,
    currentUser: AuthedUser,
    payload: RequestTrackingDTO,
    distanceToDestination,
    log,
    eventType: EventType,
    trackerId?: string
  ) {
    return await this.prismaService.tracker.create({
      data: {
        trackerId: trackerId ?? pirep.trackerId,
        userId: currentUser.id,
        type: type_of_tracker.EVENT,
        log: log,
        eventType: eventType,
        lat: Number(payload.lat),
        lng: Number(payload.lng),
        ias: Math.floor(payload.ias),
        heading: Math.floor(payload.heading),
        vs: Math.floor(payload.vs),
        gs: Math.floor(payload.gs),
        onGround: payload.onGround,
        altitude: Math.floor(payload.altitude),
        distance: distanceToDestination,
        sim_time: payload.sim_time,
        engines: payload.engines,
        gearState: payload.gearState,
        flight_phase: payload.flight_phase as flight_phase,
        flaps: payload.flaps,
        fuel: Math.floor(payload.fuel),
        weight: Math.floor(payload.weight),
        landing_rate: Math.floor(payload.rate),
        stall: payload.stall,
        overspeed: payload.overspeed,
        sim_paused: payload.sim_paused,
        transponder: payload.transponder,
      },
    });
  }

  async insertTracker(
    pirep: Pireps,
    currentUser: AuthedUser,
    payload: RequestTrackingDTO,
    distanceToDestination
  ) {
    return await this.prismaService.tracker.create({
      data: {
        trackerId: pirep.trackerId,
        userId: currentUser.id,
        type: type_of_tracker.TRACKER,
        eventType: '',
        log: `Tracked`,
        lat: Number(payload.lat),
        lng: Number(payload.lng),
        ias: Math.floor(payload.ias),
        heading: Math.floor(payload.heading),
        vs: Math.floor(payload.vs),
        gs: Math.floor(payload.gs),
        onGround: payload.onGround,
        altitude: Math.floor(payload.altitude),
        distance: distanceToDestination,
        sim_time: payload.sim_time,
        engines: payload.engines,
        gearState: payload.gearState,
        flight_phase: payload.flight_phase as flight_phase,
        flaps: payload.flaps,
        fuel: Math.floor(payload.fuel),
        weight: Math.floor(payload.weight),
        landing_rate: Math.floor(payload.rate),
        stall: payload.stall,
        overspeed: payload.overspeed,
        sim_paused: payload.sim_paused,
        transponder: payload.transponder,
      },
    });
  }

  async eventFlight(
    currentUser: AuthedUser,
    airlineId: string,
    trackId: string,
    payload: RequestTrackingDTO
  ) {
    console.log(
      `Tracking event in flight ${trackId} for  ${currentUser.email} (${currentUser.id})`
    );

    const validTrack = await canTrackValidator(
      this.prismaService,
      airlineId,
      trackId,
      currentUser,
      payload
    );

    if (payload.eventType === EventType.FLIGHT_PHASE) {
      if (payload.flight_phase === FlightPhase.PUSHBACK) {
        await this.prismaService.pireps.update({
          data: {
            blockFuel: Math.floor(payload.fuel),
            zfw: Math.floor(payload.weight),
          },
          where: {
            id: validTrack.pirep.id,
          },
        });
      }

      if (payload.flight_phase === FlightPhase.TAKE_OFF) {
        await this.prismaService.pireps.update({
          data: {
            takeoffTime: new Date(),
            tow: Math.floor(payload.weight) + Math.floor(payload.fuel),
          },
          where: {
            id: validTrack.pirep.id,
          },
        });
      }
    }

    if (payload.eventType === EventType.LANDING) {
      await this.prismaService.pireps.update({
        data: {
          landingTime: new Date(),
        },
        where: {
          id: validTrack.pirep.id,
        },
      });
    }

    await this.insertEvent(
      validTrack.pirep,
      currentUser,
      payload,
      validTrack.distanceToDestination,
      '',
      payload.eventType
    );

    return { action: 'CREATE' };
  }

  async submitFlight(
    currentUser: AuthedUser,
    airlineId: string,
    trackId: string,
    payload: RequestTrackingDTO
  ): Promise<DefaultResponse> {
    const company = await this.prismaService.airlines.findFirst({
      where: {
        icao: airlineId,
      },
    });

    if (!company) {
      throw new NotFoundException(ERROR_CODES.COMPANY_NOT_FOUND);
    }

    loggerService.info(
      `Submitting flight ${trackId} for  ${currentUser.email} (${currentUser.id})`
    );

    const pirep = await this.prismaService.pireps.findFirst({
      where: {
        trackerId: trackId,
      },
      include: {
        destination: true,
        pilot: true,
        airline: true,
        aircraft: {
          include: {
            type: true,
          },
        },
      },
    });

    if (!pirep) {
      throw new NotFoundException(ERROR_CODES.PIREP_NOT_FOUND);
    }

    let pirepStatus: pirep_status = pirep_status.ACCEPTED;

    if (pirep.status !== pirep_status.CREATED) {
      throw new BadRequestException(ERROR_CODES.PIREP_IS_SUBMITTED);
    }

    const aircraftAlias = findTypeFromAlias(payload.type);

    const isCorrectAircraft = checkAircraftType(
      aircraftAlias,
      pirep.aircraft.type.type
    );

    const isCorrectDestination = checkDistance(
      payload,
      pirep.destination,
      10000
    );

    const distanceToDestination = getDistance(
      { latitude: payload.lat, longitude: payload.lng },
      { latitude: pirep.destination.lat, longitude: pirep.destination.lng }
    );

    await this.insertEvent(
      pirep,
      currentUser,
      payload,
      distanceToDestination,
      'Flight submmited',
      EventType.FLIGHT_ENDED
    );

    const prismaTrackers = await this.prismaService.tracker.findMany({
      where: {
        trackerId: trackId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    const fuelBurned = calculateFuelUsed(pirep, prismaTrackers);
    const companyScore = calculateCompanyScore(payload, pirep, prismaTrackers);
    const flightTime = calculateFlightTime(prismaTrackers);
    const airDistance = Math.floor(getAirDistance(prismaTrackers));
    const salary = estimateSalary(
      airDistance,
      pirep.passangers,
      fuelBurned,
      isCorrectDestination,
      true
    );

    if (isCorrectAircraft === false) {
      pirepStatus = pirep_status.AWAITING_VALIDATION;
      loggerService.info(
        'Aircraft is not correct changing to ' + pirepStatus + ' for ' + trackId
      );
    }

    if (isCorrectDestination === false) {
      pirepStatus = pirep_status.AWAITING_VALIDATION;
      loggerService.info(
        'Destiantion is not correct changing to ' +
          pirepStatus +
          ' for ' +
          trackId
      );
    }

    const landingRate =
      prismaTrackers.find(
        (tracker) =>
          tracker.type === type_of_tracker.EVENT &&
          tracker.eventType === EventType.LANDING
      )?.landing_rate ?? 0;

    let emailTemplate = emails.Templates.ACCEPTED_PIREP;

    if (pirepStatus === pirep_status.AWAITING_VALIDATION) {
      emailTemplate = emails.Templates.IN_REVIEW_PIREP;
    }

    // @ts-ignore
    if (pirepStatus === pirep_status.REJECTED) {
      emailTemplate = emails.Templates.REJECTED_PIREP;
    }

    emails.sendEmail(pirep.pilot.email, emailTemplate, {
      subject: `VAManager - The status of your PIREP has been changed`,
      firstName: pirep.pilot.firstName,
      link: `${
        config.frontendUrl
      }/workspace/${pirep.airline.icao.toUpperCase()}/pirep/${pirep.id}`,
    } as PirepEmail);

    await this.prismaService.pireps.update({
      data: {
        status: pirepStatus,
        score: companyScore,
        salary: salary,
        landing_rate: Math.floor(landingRate),
        fuel_burned: Math.floor(fuelBurned),
        flightTime: flightTime,
        airDistance: Math.floor(airDistance),
      },
      where: {
        id: pirep.id,
      },
    });

    if (pirepStatus === pirep_status.ACCEPTED) {
      const companyRating = company.rating + companyScore;
      const companySalary = company.balance + salary;
      const membershipId = currentUser.memberships[0].id;
      const membershipRating = currentUser.memberships[0].rating + companyScore;

      await this.prismaService.airlines.update({
        where: {
          id: company.id,
        },
        data: {
          rating: companyRating,
          balance: companySalary,
        },
      });

      await this.prismaService.memberships.update({
        where: {
          id: membershipId,
        },
        data: {
          rating: membershipRating,
        },
      });

      const aircraftCondition =
        pirep.aircraft.condition -
        calculateAicraftDamage(pirep, prismaTrackers);
      await this.prismaService.aircrafts.update({
        where: {
          id: pirep.aircraft.id,
        },
        data: {
          miles: pirep.airDistance,
          condition: aircraftCondition,
          minutes: Math.floor(flightTime / 60),
        },
      });
    }

    return { key: IKeys.CREATE, value: pirepStatus };
  }

  async trackFlight(
    currentUser: AuthedUser,
    airlineId: string,
    trackId: string,
    payload: RequestTrackingDTO
  ) {
    loggerService.info(
      `Tracking flight ${trackId} for ${currentUser.email} (${currentUser.id})`
    );

    const company = await this.prismaService.airlines.findFirst({
      where: {
        icao: airlineId,
      },
    });

    if (!company) {
      throw new BadRequestException('AIRLINE');
    }

    const pirep = await this.prismaService.pireps.findFirst({
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
      throw new BadRequestException('PIREP');
    }

    const distanceToDestination = getDistance(
      { latitude: payload.lat, longitude: payload.lng },
      { latitude: pirep.destination.lat, longitude: pirep.destination.lng }
    );

    const findedAircraftType = findTypeFromAlias(payload.type);

    if (findedAircraftType !== pirep.aircraft.type.type) {
      throw new BadRequestException('AIRCRAFT');
    }

    this.insertTracker(pirep, currentUser, payload, distanceToDestination);
  }

  async requestTracking(
    currentUser: AuthedUser,
    airlineId: string,
    pirepId: string,
    payload: RequestTrackingDTO
  ) {
    loggerService.info(
      `Request tracking for ${currentUser.email} (${currentUser.id}) - ${pirepId}`
    );

    const company = await this.prismaService.airlines.findFirst({
      where: {
        icao: airlineId,
      },
    });

    if (!company) {
      throw new BadRequestException('AIRLINE');
    }

    const pirep = await this.prismaService.pireps.findFirst({
      where: {
        airlineId: company.id,
        pilotId: currentUser.id,
        id: pirepId,
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
      throw new BadRequestException('PIREP');
    }

    const distanceToDestination = getDistance(
      { latitude: payload.lat, longitude: payload.lng },
      { latitude: pirep.destination.lat, longitude: pirep.destination.lng }
    );

    const findedAircraftType = findTypeFromAlias(payload.type);
    if (findedAircraftType !== pirep.aircraft.type.type) {
      throw new BadRequestException('AIRCRAFT');
    }

    if (!!pirep.trackerId.length) {
      const lastTrack = await this.prismaService.tracker.findFirst({
        where: {
          trackerId: pirep.trackerId,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      if (lastTrack && lastTrack.createdAt) {
        const diff = moment()
          .utc()
          .diff(moment(lastTrack.createdAt).utc(), 'minute');

        if (diff < 15) {
          await this.insertEvent(
            pirep,
            currentUser,
            payload,
            distanceToDestination,
            `Resume tracking ${payload.type}`,
            EventType.RESUME_FLIGHT
          );
          loggerService.info(
            `Resumed tracking for ${currentUser.email} (${currentUser.id}) - ${pirepId} - tracker id - ${pirep.trackerId}`
          );
          return { action: 'CREATE', key: pirep.trackerId };
        }
      }
    }

    const distance = getDistance(
      { latitude: payload.lat, longitude: payload.lng },
      { latitude: pirep.origin.lat, longitude: pirep.origin.lng }
    );

    if (distance > 10000) {
      throw new BadRequestException('DISTANCE');
    }

    if (payload.onGround === false) {
      throw new BadRequestException('ONGROUND');
    }

    const trackerId = uuid();

    await this.prismaService.pireps.update({
      where: {
        id: pirep.id,
      },
      data: {
        trackerId: trackerId,
      },
    });

    await this.insertEvent(
      pirep,
      currentUser,
      payload,
      distanceToDestination,
      `Requested tracking flight ${payload.type}`,
      EventType.START_FLIGHT,
      trackerId
    );

    loggerService.info(
      `Requested tracking for ${currentUser.email} (${currentUser.id}) - ${pirepId} - tracker id - ${trackerId}`
    );

    return { action: 'CREATE', key: trackerId };
  }
}
