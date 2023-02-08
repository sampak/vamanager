import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Memberships, membership_status, Users } from '@prisma/client';
import prismaMembershipToMembership from 'src/adapters/prismaMembershipToMembership';
import PrismaUserToUser from 'src/adapters/prismaUserToUser';
import { AuthedUser } from 'src/dto/AuthedUser';
import { PrismaService } from 'src/prisma.service';
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

    if (prismaUser?.memberships?.[0]) {
      user.membership = prismaMembershipToMembership(
        prismaUser?.memberships?.[0]
      );
    }
    user.uiConfiguration = getUserConfiguration(prismaUser, memberships);
    return user;
  }
}
