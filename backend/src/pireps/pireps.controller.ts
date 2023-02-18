import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CurrentUser } from 'src/decorators/CurrentUser.decorator';
import { AuthedUser } from 'src/dto/AuthedUser';
import { PirepsService } from './pireps.service';
import { CreatePirepDTO } from '@shared/dto/CreatePirepDTO';

@Controller('airline/:airlineId/pireps')
export class PirepsController {
  constructor(private readonly pirepsService: PirepsService) {}

  @Get('/booked')
  async getBookedPireps(
    @CurrentUser() currentUser: AuthedUser,
    @Param('airlineId') airlineId: string
  ) {
    return await this.pirepsService.getBookedPireps(currentUser, airlineId);
  }

  @Post('/:scheduleId')
  async bookSchedule(
    @CurrentUser() currentUser: AuthedUser,
    @Param('scheduleId') scheduleId: string,
    @Param('airlineId') airlineId: string,
    @Body() payload: CreatePirepDTO
  ) {
    return await this.pirepsService.bookSchedule(
      currentUser,
      airlineId,
      scheduleId,
      payload
    );
  }

  @Patch('/:pirepId')
  async insertSimbrief(
    @CurrentUser() currentUser: AuthedUser,
    @Param('pirepId') pirepId: string,
    @Param('airlineId') airlineId: string
  ) {
    return await this.pirepsService.insertSimbrief(
      currentUser,
      airlineId,
      pirepId
    );
  }
}
