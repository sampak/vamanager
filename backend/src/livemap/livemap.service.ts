import { Injectable, NotFoundException } from '@nestjs/common';
import { type_of_tracker } from '@prisma/client';
import { LiveMap } from 'src/adapters/liveMap';
import prismaAirlineToAirline from 'src/adapters/prismaAirlineToAirline';
import prismaAirportToAirport from 'src/adapters/prismaAirportToAirport';
import PrismaUserToUser from 'src/adapters/prismaUserToUser';
import { PrismaService } from 'src/prisma.service';
import * as moment from 'moment';
import { LiveMapResponse } from '@shared/responses/LiveMapResponse';
import { Tracker } from '@shared/base/Tracker';
import { LiveMap as LiveMapDTO } from '@shared/base/LiveMap';
import { ERROR_CODES } from 'src/config/constants';
@Injectable()
export class LivemapService {
  constructor(private readonly prismaService: PrismaService) {}

  async get(): Promise<LiveMapDTO[]> {
    const startDate = moment(new Date()).subtract(3, 'minute').toDate();

    const prismaTrackers = await this.prismaService.tracker.findMany({
      distinct: ['trackerId'],
      where: {
        createdAt: {
          gte: startDate,
        },
        type: type_of_tracker.TRACKER,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return prismaTrackers.map((tracker) => LiveMap(tracker));
  }

  async getTraffic(trackerId: string): Promise<LiveMapResponse> {
    const prismaTracker = await this.prismaService.tracker.findFirst({
      where: {
        trackerId: trackerId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!prismaTracker) {
      throw new NotFoundException(ERROR_CODES.TRACKER_NOT_FOUND);
    }

    const prismaPirep = await this.prismaService.pireps.findFirst({
      where: {
        trackerId: trackerId,
      },
      include: {
        origin: true,
        destination: true,
        pilot: true,
        airline: true,
        route: true,
      },
    });

    if (!prismaPirep) {
      throw new NotFoundException(ERROR_CODES.PIREP_NOT_FOUND);
    }

    const membership = await this.prismaService.memberships.findFirst({
      where: {
        airlineId: prismaPirep.airlineId,
        userId: prismaPirep.pilot.id,
      },
    });

    const tracker = await this.prismaService.tracker.findMany({
      where: {
        trackerId: trackerId,
        type: type_of_tracker.TRACKER,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return {
      origin: prismaAirportToAirport(prismaPirep.origin),
      destination: prismaAirportToAirport(prismaPirep.destination),
      pilot: PrismaUserToUser(prismaPirep.pilot),
      airline: prismaAirlineToAirline(prismaPirep.airline),
      rating: membership.rating,
      estimatedDistance: prismaPirep.estminatedAirDistance,
      route: prismaPirep.route,
      tracker: tracker as Tracker[],
    };
  }
}
