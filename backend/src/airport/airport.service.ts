import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AirportService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return await this.prismaService.airports.findMany({
      where: {
        runwayLength: {
          gte: 7000,
        },
      },
    });
  }
}
