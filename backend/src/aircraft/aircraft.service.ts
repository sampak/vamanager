import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Users } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { BuyAircraftDTO } from '@shared/dto/BuyAircraftDTO';
import prismaAircraftToAircraft from 'src/adapters/prismaAircraftToAircraft';
import { AuthedUser } from 'src/dto/AuthedUser';
import { getSellAircraftCost } from 'src/utils/getSellAircraftCost';

@Injectable()
export class AircraftService {
  constructor(private readonly prismaService: PrismaService) {}

  async getDealerAircrafts() {
    const aircrafts = await this.prismaService.aircraftsDealer.findMany({
      include: {
        type: true,
      },
    });

    return aircrafts;
  }

  async getAllCompanyTypeOfAircrafts(airlineId: string) {
    const company = await this.prismaService.airlines.findFirst({
      where: { icao: airlineId },
    });

    if (!company) {
      throw new BadRequestException('COMPANY');
    }

    const companyAircrafts = await this.prismaService.aircrafts.findMany({
      where: {
        airlineId: company.id,
      },
      distinct: ['typeId'],
      include: {
        type: true,
      },
    });

    return companyAircrafts.map((aircraft) => aircraft.type);
  }

  async searchCompanyTypeOfAircraft(airlineId: string, search: string) {
    const company = await this.prismaService.airlines.findFirst({
      where: { icao: airlineId },
    });

    if (!company) {
      throw new BadRequestException('COMPANY');
    }

    const companyAircrafts = await this.prismaService.aircrafts.findMany({
      where: {
        airlineId: company.id,
        type: {
          OR: [
            {
              type: { contains: search.toUpperCase() },
            },
            {
              name: { contains: search.toUpperCase() },
            },
          ],
        },
      },
      distinct: ['typeId'],
      include: {
        type: true,
      },
    });

    return companyAircrafts.map((aircraft) => aircraft.type);
  }

  async buy(airlineId: string, aircraftId: string, payload: BuyAircraftDTO) {
    const airline = await this.prismaService.airlines.findFirst({
      where: {
        icao: airlineId,
      },
    });

    if (!airline) {
      throw new BadRequestException('BAD_REQUEST_AIRLINE');
    }

    const isExistAircraftWithRegistration =
      await this.prismaService.aircrafts.findFirst({
        where: {
          registration: payload.registration,
        },
      });

    if (isExistAircraftWithRegistration) {
      throw new BadRequestException('REGISTRATION_OWNED');
    }

    const aircraft = await this.prismaService.aircraftsDealer.findFirst({
      where: {
        id: aircraftId,
      },
      include: {
        type: true,
      },
    });

    if (!aircraft) {
      throw new BadRequestException('BAD_REQUEST_AIRCRAFT');
    }

    if (aircraft.cost > airline.balance) {
      throw new BadRequestException('BALANCE');
    }

    const newBalance = airline.balance - aircraft.cost;
    try {
      const newAircraft = await this.prismaService.$transaction(
        async (transactionPrisma) => {
          await transactionPrisma.airlines.update({
            where: { id: airline.id },
            data: { balance: newBalance },
          });

          return transactionPrisma.aircrafts.create({
            data: {
              image: aircraft.image,
              airlineId: airline.id,
              typeId: aircraft.type.id,
              registration: payload.registration,
            },
            include: {
              type: true,
            },
          });
        }
      );
      return prismaAircraftToAircraft(newAircraft);
    } catch (e) {
      if (e?.meta?.target === 'Aircrafts_registration_key') {
        throw new BadRequestException('REGISTRATION_OWNED');
      }
      throw new InternalServerErrorException('TRANSACTION');
    }
  }

  async sell(currentUser: AuthedUser, airlineId: string, aircraftId: string) {
    const company = await this.prismaService.airlines.findFirst({
      where: {
        icao: airlineId,
      },
    });

    if (!company) {
      throw new BadRequestException('COMPANY');
    }

    const aircraft = await this.prismaService.aircrafts.findFirst({
      where: {
        airlineId: company.id,
        id: aircraftId,
      },
      include: {
        type: true,
      },
    });

    if (!aircraft) {
      throw new BadRequestException('NOT_FOUND_AIRCRAFT');
    }

    const dealerAircraft = await this.prismaService.aircraftsDealer.findFirst({
      where: {
        typeId: aircraft.typeId,
      },
    });

    if (!dealerAircraft) {
      throw new BadRequestException('NOT_FOUND_DEALER');
    }

    const sellCost = getSellAircraftCost(dealerAircraft);

    try {
      const transactionResult = await this.prismaService.$transaction([
        this.prismaService.airlines.update({
          data: {
            balance: company.balance + sellCost,
          },

          where: {
            id: company.id,
          },
        }),

        this.prismaService.aircrafts.delete({
          where: {
            id: aircraft.id,
          },
        }),
      ]);
      console.log(
        `Aircraft ${aircraft.type.type} reg. ${aircraft.registration} from company ${company.name} was sold by ${currentUser.firstName} ${currentUser.id}`
      );
      return { action: 'DELETE', key: aircraft.id };
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException('INTERNAL');
    }
  }
}
