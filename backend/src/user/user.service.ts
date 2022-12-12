import { Injectable, UnauthorizedException } from '@nestjs/common';
import { membership_status, Users } from '@prisma/client';
import PrismaUserToUser from 'src/adapters/prismaUserToUser';
import { CurrentUser } from 'src/decorators/CurrentUser.decorator';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getMe(prismaUser: Users) {
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

    const user = PrismaUserToUser(prismaUser, memberships);
    return user;
  }
}
