import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { MembershipsController } from './memberships.controller';
import { MembershipsService } from './memberships.service';

@Module({
  controllers: [MembershipsController],
  providers: [MembershipsService, PrismaService],
})
export class MembershipsModule {}
