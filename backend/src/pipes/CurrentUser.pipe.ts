// parse-token.pipe.ts
import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Users, Prisma, membership_status } from '@prisma/client';
import { config } from 'src/config';
import { PrismaService } from 'src/prisma.service';
@Injectable()
export class CurrentUserPipe implements PipeTransform {
  constructor(private readonly prismaService: PrismaService) {}

  async transform(payload: { workspace: string; token: string }) {
    if (!payload.token) {
      return null;
    }

    const workspace = payload.workspace;
    const token = payload.token;

    try {
      const access_token = token.replace('Bearer ', '');
      const jwtUser = await jwt.verify(access_token, config.jwt.secret);
      try {
        const user = await this.prismaService.users.findUniqueOrThrow({
          where: {
            id: jwtUser.id,
          },

          include: {
            memberships: {
              where: {
                OR: [
                  {
                    status: membership_status.ACTIVE,
                  },
                  {
                    status: membership_status.WAITING_TO_JOIN,
                  },
                ],
                airline: {
                  icao: workspace ?? '',
                },
              },

              include: {
                airline: true,
              },
            },
          },
        });

        const waitingJoinWorkspace = user.memberships.find(
          (membership) =>
            membership.status === membership_status.WAITING_TO_JOIN &&
            membership.airline.icao === workspace
        );
        if (waitingJoinWorkspace) {
          await this.prismaService.memberships.update({
            where: {
              id: waitingJoinWorkspace.id,
            },
            data: {
              status: membership_status.ACTIVE,
            },
          });
        }

        if (!!workspace && !user.memberships.length) {
          throw new HttpException('', HttpStatus.UNAUTHORIZED);
        }
        return user as Users;
      } catch (e) {
        throw new HttpException('', HttpStatus.UNAUTHORIZED);
      }
    } catch (e) {
      throw new HttpException('', HttpStatus.UNAUTHORIZED);
    }
  }
}
