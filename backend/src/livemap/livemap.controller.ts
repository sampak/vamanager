import { Controller, Get, Param } from '@nestjs/common';
import { LivemapService } from './livemap.service';

@Controller('livemap')
export class LivemapController {
  constructor(private readonly liveMapService: LivemapService) {}

  @Get('/')
  async liveMap() {
    return await this.liveMapService.get();
  }

  @Get('/:trackerId')
  async getTraffic(@Param('trackerId') trackerId: string) {
    return await this.liveMapService.getTraffic(trackerId);
  }
}
