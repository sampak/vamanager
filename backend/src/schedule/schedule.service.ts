import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  Schedules,
  schedule_status,
  type_of_flight,
  type_of_schedules,
  Users,
} from '@prisma/client';
import { CreateSimbriefDTO } from '@shared/dto/CreateSimbriefDTO';
import { PrismaService } from 'src/prisma.service';
import simbrief from '../utils/simbrief';
import * as moment from 'moment';
import prismaScheduleToSchedule from 'src/adapters/prismaScheduleToSchedule';
import getScheduleConfiguration from 'src/ui-configuration/schedule';
import { CurrentUser } from 'src/decorators/CurrentUser.decorator';

@Injectable()
export class ScheduleService {
  constructor(private readonly prismaService: PrismaService) {}

  async getSchedules(airlineId: string, currentUser: Users) {
    const company = await this.prismaService.airlines.findFirst({
      where: { icao: airlineId },
    });
    const weekDay = moment().weekday();
    if (!company) throw new BadRequestException('COMPANY');
    const schedules = await this.prismaService.schedules.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        airlineId: company.id,
        OR: [
          {
            type: type_of_schedules.EVERYDAY,
          },
          {
            type: type_of_schedules.ONCE,
            day: {
              lte: moment(moment().add(1, 'day').format('yyyy-MM-DD')).toDate(),
              gte: moment(moment().format('yyyy-MM-DD')).toDate(),
            },
          },
          {
            type: type_of_schedules.ON_CERTAIN_DAYS,
            weekDay: weekDay,
          },
        ],
      },
      include: {
        origin: true,
        destination: true,
        type_of_aircraft: true,
      },
    });

    const membership = await this.prismaService.memberships.findFirst({
      where: { airlineId: company.id, userId: currentUser.id },
    });

    return schedules.map((prismaSchedule) => {
      const schedule = prismaScheduleToSchedule(prismaSchedule);
      schedule.uiConfiguration = getScheduleConfiguration(
        prismaSchedule,
        membership
      );
      return schedule;
    });
  }

  async getSimbrief(staticID: string) {
    const schedule = await this.prismaService.schedules.findFirst({
      where: {
        id: staticID,
        status: schedule_status.CREATING,
      },
      include: {
        origin: true,
      },
    });

    if (!schedule) {
      throw new NotFoundException('SCHEUDLE_NOT_FOUND');
    }

    try {
      const simbriefData = await simbrief.fetch(staticID);

      const flightTime: number = Number(simbriefData.times.est_time_enroute);
      const fuel: number = Number(simbriefData.fuel.enroute_burn);
      const route: string = simbriefData.general.route;
      const air_distance: number = Number(simbriefData.general.air_distance);
      const passangers: number = Number(simbriefData.general.passengers);

      let estimatedPassangers = passangers;

      if (schedule.origin.passangers < passangers) {
        estimatedPassangers = schedule.origin.passangers;
      }

      await this.prismaService.schedules.update({
        where: { id: staticID },
        data: {
          flightTime: flightTime,
          estimatedFuel: fuel,
          airDistance: air_distance,
          recommendedRoute: route,
          estimatedPassangers: estimatedPassangers,
          status: schedule_status.CREATED,
        },
      });

      return { key: 'CREATE', id: staticID };
    } catch (e) {
      console.log(e);
      throw new NotFoundException('SIMBRIEF');
    }
  }

  async delete(airlineId: string, scheduleID: string) {
    const company = await this.prismaService.airlines.findFirst({
      where: { icao: airlineId },
    });

    if (!company) {
      throw new NotFoundException('NOT_FOUND');
    }

    const schedule = await this.prismaService.schedules.findFirst({
      where: {
        id: scheduleID,
        airlineId: company.id,
      },
    });

    if (!schedule) {
      throw new NotFoundException('NOT_FOUND');
    }

    await this.prismaService.schedules.delete({
      where: { id: schedule.id },
    });

    return { key: 'DELETE', value: schedule.id };
  }

  async generateSimbrief(
    currentUser: Users,
    airlineId: string,
    payload: CreateSimbriefDTO
  ) {
    const schedule = await this.prismaService.schedules.findFirst({
      where: {
        flightNumber: payload.flightNumber,
        airline: {
          icao: airlineId,
        },
      },
    });

    let scheduleId = '';

    const origin = await this.prismaService.airports.findFirst({
      where: { id: payload.origin },
    });

    const destination = await this.prismaService.airports.findFirst({
      where: { id: payload.destination },
    });

    const aircraft = await this.prismaService.typeOfAircraft.findFirst({
      where: { id: payload.aircraft },
    });

    const airline = await this.prismaService.airlines.findFirst({
      where: {
        icao: airlineId,
      },
    });

    if (!origin || !destination) {
      throw new BadRequestException('AIRPORT');
    }

    if (!aircraft) {
      throw new BadRequestException('AIRCRAFT');
    }

    if (!airline) {
      throw new BadRequestException('AIRLINE');
    }

    if (schedule && schedule.status === schedule_status.CREATING) {
      scheduleId = schedule.id;
    }

    if (schedule && schedule.status === schedule_status.CREATED) {
      throw new BadRequestException('EXIST');
    }

    if (!schedule) {
      const insertData = {
        callsign: payload.callsign.toUpperCase(),
        flightNumber: payload.flightNumber.toUpperCase(),
        type: payload.type,
        airlineId: airline.id,
        originId: origin.id,
        destinationId: destination.id,
        creatorId: currentUser.id,
        flightTime: 0,
        typeOfAircraftId: aircraft.id,
        type_of_flight: type_of_flight.PASSANGERS,
        status: schedule_status.CREATING,
        day: payload.day,
        costIndex: String(payload.costIndex),
        weekDay: Number(payload.weekDay),
      };

      const newSchedule = await this.prismaService.schedules.create({
        data: insertData,
      });
      scheduleId = newSchedule.id;
    }

    const originICAO = origin.icao.toUpperCase();
    const destinationICAO = destination.icao.toUpperCase();

    const url = await simbrief.create(
      currentUser,
      airline.name,
      scheduleId,
      payload.flightNumber,
      aircraft.type,
      originICAO,
      destinationICAO,
      {
        callsign: payload.callsign,
        route: payload.route,
        costIndex: String(payload.costIndex),
      }
    );

    return { scheduleId: scheduleId, url: url };
  }
}
