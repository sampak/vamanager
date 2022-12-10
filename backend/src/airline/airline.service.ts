import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Users } from '@prisma/client';
import { CreateAirlineDTO } from '@shared/dto/CreateAirlineDTO';
import { MembershipStatus } from '@shared/base/MembershipStatus';
import { PrismaService } from 'src/prisma.service';
import { join } from 'path';
import { converBase64ToImage } from 'convert-base64-to-image';
import prismaAirlineToAirline from 'src/adapters/prismaAirlineToAirline';

@Injectable()
export class AirlineService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(currentUser: Users, payload: CreateAirlineDTO) {
    const isExist = await this.prismaService.airlines.findFirst({
      where: {
        OR: {
          name: payload.name,
          icao: payload.icao,
        },
      },
    });

    if (isExist) {
      throw new BadRequestException('EXIST');
    }

    const airline = await this.prismaService.airlines.create({
      data: {
        name: payload.name,
        icao: payload.icao,
        baseId: payload.base,
        joining_type: payload.joiningMethod,
        ownerId: currentUser.id,
        balance: 1000000,
        //@ts-ignore
        options: payload.options,
      },
    });

    if (!airline) {
      throw new InternalServerErrorException();
    }

    const membership = await this.prismaService.memberships.create({
      data: {
        airlineId: airline.id,
        userId: currentUser.id,
        status: MembershipStatus.ACTIVE,
      },
    });

    if (!!payload.image?.length) {
      const path = converBase64ToImage(
        payload.image,
        `${join(__dirname, '../../../public')}/airlines/${
          payload.icao
        }/logo.png`
      );
    }

    const air = prismaAirlineToAirline(airline);
    air.image = `http://localhost:4000/public/airlines/${payload.icao}/logo.png`;

    return air;
  }
}
