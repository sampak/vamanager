import { Injectable, UnauthorizedException } from '@nestjs/common';
import {
  Memberships,
  membership_status,
  Pireps,
  pirep_status,
  Users,
} from '@prisma/client';
import * as moment from 'moment';
import prismaMembershipToMembership from 'src/adapters/prismaMembershipToMembership';
import PrismaUserToUser from 'src/adapters/prismaUserToUser';
import { CurrentUser } from 'src/decorators/CurrentUser.decorator';
import { AuthedUser } from 'src/dto/AuthedUser';
import { PrismaService } from 'src/prisma.service';
import getMembershipConfiguration from 'src/ui-configuration/membership';
import getUserConfiguration from 'src/ui-configuration/user';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getMemberships(prismaUser: Users) {
    const prismaMemberships = await this.prisma.memberships.findMany({
      where: {
        userId: prismaUser.id,
        status: {
          in: [
            membership_status.ACTIVE,
            membership_status.WAITING_APPROVAL,
            membership_status.WAITING_TO_JOIN,
          ],
        },
      },
      include: {
        airline: true,
      },
    });

    return prismaMemberships.map((membership) =>
      prismaMembershipToMembership(membership, true)
    );
  }

  async getMe(prismaUser: AuthedUser) {
    if (!prismaUser?.id) {
      throw new UnauthorizedException();
    }

    const memberships = await this.prisma.memberships.findMany({
      where: {
        userId: prismaUser.id,
        status: {
          in: [
            membership_status.ACTIVE,
            membership_status.WAITING_APPROVAL,
            membership_status.WAITING_TO_JOIN,
          ],
        },
      },
    });

    const user = PrismaUserToUser(prismaUser, true);

    let prismaPireps = [];

    if (prismaUser?.memberships?.[0]) {
      user.membership = prismaMembershipToMembership(
        prismaUser?.memberships?.[0]
      );

      prismaPireps = await this.prisma.pireps.findMany({
        where: {
          pilotId: prismaUser.id,
          airlineId: user.membership.airlineId,
        },
      });

      const endedPireps = prismaPireps.filter(
        (pirep) => pirep.status !== pirep_status.CREATED
      );

      const seconds: number = prismaPireps.reduce(
        (partialSum, pirep: Pireps) => partialSum + pirep.flightTime,
        0
      );

      const hours = moment.utc(seconds * 1000).format('HH:mm');

      user.membership.hours = hours ?? '00:00';
      user.membership.pirepsFilled = endedPireps.length;
      user.membership.averageLandingRate =
        Math.floor(
          endedPireps.reduce(
            (partialSum, pirep: Pireps) => partialSum + pirep.landing_rate,
            0
          ) / endedPireps.length
        ) ?? 0;
    }
    user.uiConfiguration = getUserConfiguration(prismaUser, memberships);

    if (user.membership) {
      user.membership.uiConfiguration = getMembershipConfiguration(
        prismaUser?.memberships?.[0],
        prismaUser,
        null,
        prismaPireps
      );
    }
    return user;
  }
}
