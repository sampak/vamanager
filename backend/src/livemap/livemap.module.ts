import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { LivemapController } from './livemap.controller';
import { LivemapService } from './livemap.service';

@Module({
  controllers: [LivemapController],
  providers: [LivemapService, PrismaService],
})
export class LivemapModule {}
