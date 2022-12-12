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
                status: membership_status.ACTIVE,
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
        if (!!workspace && !user.memberships.length) {
          throw new HttpException('', HttpStatus.FORBIDDEN);
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
