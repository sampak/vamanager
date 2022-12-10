import { Body, Controller, Post } from '@nestjs/common';
import { AirlineService } from './airline.service';
import { CreateAirlineDTO } from '@shared/dto/CreateAirlineDTO';
import { CurrentUser } from 'src/decorators/CurrentUser.decorator';

@Controller('airline')
export class AirlineController {
  constructor(private readonly airlineService: AirlineService) {}

  @Post('/')
  async create(@CurrentUser() currentUser, @Body() payload: CreateAirlineDTO) {
    return await this.airlineService.create(currentUser, payload);
  }
}
