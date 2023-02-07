import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { CurrentUser } from 'src/decorators/CurrentUser.decorator';
import { SentryInterceptor } from 'src/interceptors/SentryInterceptor';
import { AirportService } from './airport.service';
@UseInterceptors(SentryInterceptor)
@Controller('airport')
export class AirportController {
  constructor(private readonly airportService: AirportService) {}

  @Get('/:search')
  async search(@CurrentUser() user, @Param('search') search: string) {
    return await this.airportService.search(search);
  }

  @Get('/')
  async getAll(@CurrentUser() user) {
    return await this.airportService.getAll();
  }
}
