import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AircraftController } from './aircraft.controller';
import { AircraftService } from './aircraft.service';

@Module({
  controllers: [AircraftController],
  providers: [AircraftService, PrismaService],
})
export class AircraftModule {}
