import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  joining_type,
  Memberships,
  membership_role,
  membership_status,
  Users,
} from '@prisma/client';
import { CreateAirlineDTO } from '@shared/dto/CreateAirlineDTO';
import { MembershipStatus } from '@shared/base/MembershipStatus';
import { MembershipRole } from '@shared/base/MembershipRole';
import { PrismaService } from 'src/prisma.service';
import prismaAirlineToAirline from 'src/adapters/prismaAirlineToAirline';
import { config } from 'src/config';
import { User } from '@shared/base/User';
import prismaAircraftToAircraft from 'src/adapters/prismaAircraftToAircraft';
@Injectable()
export class AirlineService {
  constructor(private readonly prismaService: PrismaService) {}

  async join(currentUser: User, airlineId: string) {
    const airline = await this.prismaService.airlines.findUnique({
      where: { id: airlineId },
    });

    if (!airline) {
      throw new BadRequestException();
    }

    let status: membership_status = membership_status.WAITING_APPROVAL;

    if (airline.joining_type === joining_type.PUBLIC_ACCESS) {
      status = membership_status.ACTIVE;
    }

    const payload = {
      airlineId: airlineId,
      role: membership_role.PILOT,
      status: status,
      userId: currentUser.id,
    };

    try {
      const membership = await this.prismaService.memberships.create({
        data: payload,
      });

      return { key: membership.id, type: 'CREATE' };
    } catch (e) {
      console.log('Joining to workspace failed', e);
    }
  }

  async getAircrafts(airlineId: string) {
    const airline = await this.prismaService.airlines.findFirst({
      where: {
        icao: airlineId,
      },
    });

    if (!airline) throw new BadRequestException('BAD_REQUEST');

    const prismaAircrafts = await this.prismaService.aircrafts.findMany({
      where: {
        airlineId: airline.id,
      },
      include: {
        type: true,
      },
    });

    return prismaAircrafts.map((aircraft) =>
      prismaAircraftToAircraft(aircraft)
    );
  }

  async getAll() {
    const airlines = await this.prismaService.airlines.findMany({
      where: {
        joining_type: {
          in: [joining_type.APPROVAL_NEEDED, joining_type.PUBLIC_ACCESS],
        },
      },
      include: {
        memberships: true,
        owner: true,
      },
    });

    return airlines.map((airline) => prismaAirlineToAirline(airline));
  }

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
        icao: payload.icao.toUpperCase(),
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

    await this.prismaService.memberships.create({
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
