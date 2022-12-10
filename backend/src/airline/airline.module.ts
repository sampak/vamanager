import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AirlineController } from './airline.controller';
import { AirlineService } from './airline.service';

@Module({
  controllers: [AirlineController],
  providers: [AirlineService, PrismaService],
})
export class AirlineModule {}
