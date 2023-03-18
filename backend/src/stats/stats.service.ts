import { Injectable } from '@nestjs/common';
import { Memberships, pirep_status, users_status } from '@prisma/client';
import prismaAirlineToAirline from 'src/adapters/prismaAirlineToAirline';
import prismaMembershipToMembership from 'src/adapters/prismaMembershipToMembership';
import prismaPirepToPirep from 'src/adapters/prismaPirepToPirep';
import PrismaUserToUser from 'src/adapters/prismaUserToUser';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class StatsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getRanking() {
    const prismaCompanyRanking = await this.prismaService.airlines.findMany({
      orderBy: {
        rating: 'desc',
      },
      take: 10,
    });

    const prismaUserRanking = await this.prismaService.users.findMany({
      where: {
        status: users_status.ACTIVE,
      },
      include: {
        memberships: true,
      },
    });

    const users = prismaUserRanking
      .map((prismaUser) => {
        const adaptedUser = PrismaUserToUser(prismaUser);

        const rating =
          prismaUser.memberships.reduce(
            (partialSum, membership: Memberships) =>
              partialSum + membership.rating,
            0
          ) / prismaUser.memberships.length;

        return {
          id: adaptedUser.id,
          firstName: adaptedUser.firstName,
          lastName: adaptedUser.lastName,
          rating,
        };
      })
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 10);

    return {
      airlines: prismaCompanyRanking.map((prismaCompany) =>
        prismaAirlineToAirline(prismaCompany)
      ),
      users,
    };
  }

  async getLastPireps() {
    const prismaPireps = await this.prismaService.pireps.findMany({
      where: {
        status: {
          in: [
            pirep_status.CREATED,
            pirep_status.ACCEPTED,
            pirep_status.REJECTED,
          ],
        },
      },
      include: {
        origin: true,
        destination: true,
        airline: true,
        aircraft: {
          include: {
            type: true,
          },
        },
      },
      take: 5,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return prismaPireps.map((pirep) => prismaPirepToPirep(pirep));
  }
}
