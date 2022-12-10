import { Controller, Get } from '@nestjs/common';
import { CurrentUser } from 'src/decorators/CurrentUser.decorator';
import { AirportService } from './airport.service';

@Controller('airport')
export class AirportController {
  constructor(private readonly airportService: AirportService) {}

  @Get('/')
  async getAll(@CurrentUser() user) {
    return await this.airportService.getAll();
  }
}
