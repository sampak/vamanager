import { Injectable } from '@nestjs/common';
import prismaAirportToAirport from 'src/adapters/prismaAirportToAirport';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AirportService {
  constructor(private readonly prismaService: PrismaService) {}

  async search(search: string) {
    const airports = await this.prismaService.airports.findMany({
      where: {
        OR: [
          {
            icao: {
              contains: search.toUpperCase(),
            },
          },
          {
            name: {
              contains: search,
            },
          },
          {
            keywords: {
              contains: search,
            },
          },
        ],
      },
    });

    return airports.map((airport) => prismaAirportToAirport(airport));
  }

  async getAll() {
    const airports = await this.prismaService.airports.findMany({});
    return airports.map((airport) => prismaAirportToAirport(airport));
  }
}
