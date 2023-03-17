import { Controller, Get } from '@nestjs/common';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('/ranking')
  async getRanking() {
    return await this.statsService.getRanking();
  }

  @Get('/last-pireps')
  async getLastPireps() {
    return await this.statsService.getLastPireps();
  }
}
