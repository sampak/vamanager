import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { pirep_status, prisma } from '@prisma/client';
import { AuthedUser } from 'src/dto/AuthedUser';
import { PrismaService } from 'src/prisma.service';
import simbrief from '../utils/simbrief';
import { CreatePirepDTO } from '@shared/dto/CreatePirepDTO';
import prismaPirepToPirep from 'src/adapters/prismaPirepToPirep';

@Injectable()
export class PirepsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getBookedPireps(currentUser: AuthedUser, airlineId: string) {
    const airline = await this.prismaService.airlines.findFirst({
      where: {
        icao: airlineId,
      },
    });

    if (!airline) {
      throw new NotFoundException('NOT_FOUND_AIRLINE');
    }

    const prismaPireps = await this.prismaService.pireps.findMany({
      where: {
        airlineId: airline.id,
        pilotId: currentUser.id,
        status: pirep_status.CREATED,
      },
      include: {
        aircraft: {
          include: {
            type: true,
          },
        },
        destination: true,
        origin: true,
      },
    });

    return prismaPireps.map((prismaPirep) => prismaPirepToPirep(prismaPirep));
  }

  async insertSimbrief(currentUser: AuthedUser, airlineId, pirepId: string) {
    const prismaPirep = await this.prismaService.pireps.findFirst({
      where: {
        id: pirepId,
        pilotId: currentUser.id,
      },
    });

    if (!prismaPirep) {
      throw new NotFoundException('NOT_FOUND_PIREP');
    }

    const simbriefData = await simbrief.fetch(prismaPirep.id);

    const orig_metar = simbriefData.weather.orig_metar;
    const orig_taf = simbriefData.weather.orig_taf;
    const dest_metar = simbriefData.weather.dest_metar;
    const dest_taf = simbriefData.weather.dest_taf;
    const altn_metar = simbriefData.weather.altn_metar;
    const altn_taf = simbriefData.weather.altn_taf;
    const plan_html = simbriefData.text.plan_html;
    const fixes = simbriefData.navlog.fix;

    await this.prismaService.pireps.update({
      where: {
        id: prismaPirep.id,
      },
      data: {
        dx_rmk: simbriefData.general.dx_rmk,
        flightplanText: simbriefData.atc.flightplan_text,
        routeText: simbriefData.atc.route,
        remarks: simbriefData.atc.section18,
        est_zfw: Number(simbriefData.weights.est_zfw),
        est_tow: Number(simbriefData.weights.est_tow),
        orig_metar: orig_metar,
        orig_taf: orig_taf,
        dest_metar: dest_metar,
        dest_taf: dest_taf,
        altn_metar: altn_metar,
        altn_taf: altn_taf,
        plan_html: plan_html,
        units: simbriefData.params.units,
        status: pirep_status.CREATED,
      },
    });

    try {
      await this.prismaService.$transaction(async (tx) => {
        await tx.pirepsRoute.deleteMany({
          where: {
            pirepId: prismaPirep.id,
          },
        });

        await Promise.all(
          fixes
            .filter((fix) => fix.type !== 'ltlg' && fix.type !== 'apt')
            .map(async (fix, index) => {
              return await tx.pirepsRoute.create({
                data: {
                  pirepId: prismaPirep.id,
                  ident: fix.ident,
                  name: fix.name,
                  type: fix.type,
                  pos_lat: fix.pos_lat,
                  pos_lng: fix.pos_long,
                  airway: fix.via_airway,
                  is_sid_star: fix.is_sid_star === '1',
                  index: index,
                },
              });
            })
        );
      });
      return { action: 'UPDATE', key: pirepId };
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException('TRANSACTION');
    }
  }

  async bookSchedule(
    currentUser: AuthedUser,
    airlineId: string,
    scheduleId: string,
    payload: CreatePirepDTO
  ) {
    const airline = await this.prismaService.airlines.findFirst({
      where: {
        icao: airlineId,
      },
    });

    if (!airline) {
      throw new NotFoundException('NOT_FOUND_AIRLINE');
    }

    const schedule = await this.prismaService.schedules.findFirst({
      where: {
        id: scheduleId,
      },
      include: {
        origin: true,
        destination: true,
      },
    });

    if (!schedule) {
      throw new NotFoundException('NOT_FOUND_SCHEDULE');
    }

    const aircraft = await this.prismaService.aircrafts.findFirst({
      where: {
        id: payload.aircraftID,
      },
      include: {
        type: true,
      },
    });

    if (!aircraft) {
      throw new NotFoundException('NOT_FOUND_AIRCRAFT');
    }

    if (aircraft.condition === 0) {
      throw new BadRequestException('AIRCRAFT_CONDITION');
    }

    const prismaPirep = await this.prismaService.pireps.create({
      data: {
        callsign: schedule.callsign,
        flightNumber: schedule.flightNumber,
        estimatedFuel: schedule.estimatedFuel,
        estminatedAirDistance: schedule.airDistance,
        passangers: schedule.estimatedPassangers,
        estimatedFlightTime: schedule.flightTime,
        originId: schedule.originId,
        destinationId: schedule.destinationId,
        airlineId: schedule.airlineId,
        pilotId: currentUser.id,
        aircraftId: aircraft.id, // change to real
        status: pirep_status.CREATING,
      },
    });

    const url = await simbrief.create(
      currentUser,
      airline.name,
      prismaPirep.id,
      schedule.flightNumber,
      aircraft.type.type,
      schedule.origin.icao,
      schedule.destination.icao,
      {
        callsign: schedule.callsign,
        reg: aircraft.registration,
        costIndex: schedule.costIndex,
      }
    );

    return { action: 'CREATED', key: prismaPirep.id, url: url };
  }
}
