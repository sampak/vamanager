import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PirepsController } from './pireps.controller';
import { PirepsService } from './pireps.service';

@Module({
  controllers: [PirepsController],
  providers: [PirepsService, PrismaService],
})
export class PirepsModule {}
