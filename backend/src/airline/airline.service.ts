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
  Prisma,
  Users,
  users_status,
} from '@prisma/client';
import { CreateAirlineDTO } from '@shared/dto/CreateAirlineDTO';
import { MembershipStatus } from '@shared/base/MembershipStatus';
import { MembershipRole } from '@shared/base/MembershipRole';
import { PrismaService } from 'src/prisma.service';
import prismaAirlineToAirline from 'src/adapters/prismaAirlineToAirline';
import { config } from 'src/config';
import { User } from '@shared/base/User';
import prismaAircraftToAircraft from 'src/adapters/prismaAircraftToAircraft';
import prismaMembershipToMembership from 'src/adapters/prismaMembershipToMembership';
import { UsersSearchOrder } from '@shared/dto/UsersSearchDTO';
import getUserConfiguration from 'src/ui-configuration/user';
import getMembershipConfiguration from 'src/ui-configuration/membership';
import emails from 'src/utils/emails';
import { InvitationEmail } from '@shared/emails/Invitation.email';
import { AuthedUser } from 'src/dto/AuthedUser';
import { getSellAircraftCost } from 'src/utils/getSellAircraftCost';
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

    const prismaMembership = await this.prismaService.memberships.findFirst({
      where: {
        airlineId: airline.id,
        userId: currentUser.id,
      },
    });

    if (prismaMembership) {
      throw new BadRequestException('');
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

  async search(
    currentUser: AuthedUser,
    airlineId: string,
    type: string = '',
    minCondition: number = 0,
    search: string = ''
  ) {
    const airline = await this.prismaService.airlines.findFirst({
      where: {
        icao: airlineId,
      },
    });

    if (!airline) throw new BadRequestException('BAD_REQUEST');

    const prismaAircrafts = await this.prismaService.aircrafts.findMany({
      where: {
        airlineId: airline.id,
        condition: {
          gt: minCondition,
        },
        OR: [
          {
            registration: {
              contains: search?.toLocaleLowerCase() ?? '',
            },
          },
        ],
        type: {
          type: type,
        },
      },
      include: {
        type: {
          include: {
            aircraftsDealer: true,
          },
        },
      },
    });

    return prismaAircrafts.map((prismaAircraft) => {
      let aircraft = prismaAircraftToAircraft(prismaAircraft, currentUser);
      aircraft.sellCost = getSellAircraftCost(
        prismaAircraft.type.aircraftsDealer.find(
          (dealer) => dealer.typeId === prismaAircraft.typeId
        )
      );

      return aircraft;
    });
  }

  async getAircrafts(currentUser: AuthedUser, airlineId: string) {
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
        type: {
          include: {
            aircraftsDealer: true,
          },
        },
      },
    });

    return prismaAircrafts.map((prismaAircraft) => {
      let aircraft = prismaAircraftToAircraft(prismaAircraft, currentUser);
      aircraft.sellCost = getSellAircraftCost(
        prismaAircraft.type.aircraftsDealer.find(
          (dealer) => dealer.typeId === prismaAircraft.typeId
        )
      );

      return aircraft;
    });
  }

  async getUsers(
    currentUser: AuthedUser,
    airlineId: string,
    name: string,
    orderBy: UsersSearchOrder
  ) {
    const currentUserMembership = currentUser.memberships[0];
    const airline = await this.prismaService.airlines.findFirst({
      where: { icao: airlineId },
    });
    if (!airline) throw new BadRequestException();

    let membershipsFind: Prisma.MembershipsWhereInput = {
      airlineId: airline.id,
    };

    if (!!name?.length) {
      membershipsFind = {
        ...membershipsFind,
        user: {
          OR: [
            {
              firstName: {
                contains: name,
              },
            },
            {
              lastName: {
                contains: name,
              },
            },
            {
              email: {
                contains: name,
              },
            },
          ],
        },
      };
    }

    const memberships = await this.prismaService.memberships.findMany({
      where: membershipsFind,
      orderBy: {
        createdAt: orderBy === UsersSearchOrder.LATEST ? 'desc' : 'asc',
      },
      include: {
        user: true,
      },
    });

    return memberships.map((prismaMembership) => {
      let membership = prismaMembershipToMembership(
        prismaMembership,
        currentUserMembership.role === membership_role.ADMIN
      );
      membership.uiConfiguration = getMembershipConfiguration(
        prismaMembership,
        currentUser,
        airline
      );

      return membership;
    });
  }

  async getAll(CurrentUser: Users) {
    const airlines = await this.prismaService.airlines.findMany({
      where: {
        joining_type: {
          in: [joining_type.APPROVAL_NEEDED, joining_type.PUBLIC_ACCESS],
        },
        memberships: {
          none: {
            userId: CurrentUser.id,
          },
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

  async invite(currentUser: Users, workspaceId: string, payload) {
    const company = await this.prismaService.airlines.findFirst({
      where: { icao: workspaceId },
    });
    if (!company) {
      throw new BadRequestException('COMPANY');
    }

    let prismaUser = await this.prismaService.users.findFirst({
      where: {
        email: payload.email,
      },
    });

    if (!prismaUser) {
      prismaUser = await this.prismaService.users.create({
        data: {
          email: payload.email,
          firstName: '',
          lastName: '',
          password: '',
          allowShowLastName: false,
          status: users_status.WAITING_TO_JOIN,
        },
      });
    }

    const userMembership = await this.prismaService.memberships.findFirst({
      where: {
        airlineId: company.id,
        userId: prismaUser.id,
      },
    });

    if (userMembership) {
      throw new BadRequestException('USER_EXIST');
    }

    const membership = await this.prismaService.memberships.create({
      data: {
        airlineId: company.id,
        role: membership_role.PILOT,
        status: membership_status.WAITING_TO_JOIN,
        userId: prismaUser.id,
      },
    });

    let link = `${config.frontendUrl}/auth/signin?company=${membership.id}&email=${payload.email}`;

    if (prismaUser.status === users_status.WAITING_TO_JOIN) {
      link = `${config.frontendUrl}/auth/signup?company=${membership.id}&email=${payload.email}`;
    }

    emails.sendEmail(payload.email, emails.Templates.INVITATION, {
      subject: `VAManager - You've been invited to a ${company.name}`,
      name: company.name,
      icao: company.icao,
      firstName: currentUser.firstName,
      email: currentUser.email,
      image: company.image,
      link: link,
    } as InvitationEmail);

    return { action: 'CREATE', value: membership.id };
  }
}
