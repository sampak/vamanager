import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Users } from '@prisma/client';
import { CreateAirlineDTO } from '@shared/dto/CreateAirlineDTO';
import { MembershipStatus } from '@shared/base/MembershipStatus';
import { MembershipRole } from '@shared/base/MembershipRole';
import { PrismaService } from 'src/prisma.service';
import prismaAirlineToAirline from 'src/adapters/prismaAirlineToAirline';
import { config } from 'src/config';

@Injectable()
export class AirlineService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    S3Client: AWS.S3,
    currentUser: Users,
    payload: CreateAirlineDTO
  ) {
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
        role: MembershipRole.ADMIN,
      },
    });

    if (!!payload?.image?.length) {
      const base64Data = Buffer.from(
        payload.image.replace(/^data:image\/\w+;base64,/, ''),
        'base64'
      );
      const type = payload.image.split(';')[0].split('/')[1];

      const params = {
        Bucket: config.AWS_BUCKET_NAME,
        Key: `${payload.icao}/logo.${type}`,
        Body: base64Data,
        ACL: 'public-read',
        ContentEncoding: 'base64',
        ContentType: `image/${type}`,
      };

      try {
        const awsResponse = await S3Client.upload(params).promise();
        const updatedAirline = await this.prismaService.airlines.update({
          data: {
            image: awsResponse.Location,
          },
          where: { id: airline?.id },
        });
        console.log(
          `${currentUser.email} (${currentUser.id}) created airline: ${payload.name} (${payload.icao})`
        );
        return prismaAirlineToAirline(updatedAirline);
      } catch (e) {
        console.log('Failed to create airline');
        console.log(e);
      }
    }
    console.log(
      `${currentUser.email} (${currentUser.id}) created airline: ${payload.name} (${payload.icao})`
    );
    return prismaAirlineToAirline(airline);
  }
}
