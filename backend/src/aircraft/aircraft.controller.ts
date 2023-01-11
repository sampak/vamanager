import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/decorators/CurrentUser.decorator';
import { AircraftService } from './aircraft.service';
import { BuyAircraftDTO } from '@shared/dto/BuyAircraftDTO';
import { MembershipRole } from '@shared/base/MembershipRole';
import { roleGuard } from 'src/guards/role.guard';

@Controller('airline/:airlineId/aircraft')
export class AircraftController {
  constructor(private readonly aircraftService: AircraftService) {}

  @Get('/dealer')
  async getAircraftsFromDealer(@CurrentUser() currentUser) {
    return this.aircraftService.getDealerAircrafts();
  }

  @SetMetadata('roles', [MembershipRole.ADMIN])
  @UseGuards(roleGuard)
  @Post('/:aircraftId')
  async buy(
    @Param('airlineId') airlineId,
    @Param('aircraftId') aircraftId,
    @Body() payload: BuyAircraftDTO
  ) {
    return this.aircraftService.buy(airlineId, aircraftId, payload);
  }
}
