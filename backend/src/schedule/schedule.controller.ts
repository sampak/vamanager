import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  SetMetadata,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { Users } from '@prisma/client';
import { CurrentUser } from 'src/decorators/CurrentUser.decorator';
import { MembershipRole } from '@shared/base/MembershipRole';
import { roleGuard } from 'src/guards/role.guard';
import { CreateSimbriefDTO } from '@shared/dto/CreateSimbriefDTO';
import { SentryInterceptor } from 'src/interceptors/SentryInterceptor';

@UseInterceptors(SentryInterceptor)
@Controller('airline/:airlineId/schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get('/')
  getSchedules(
    @Param('airlineId') airlineId: string,
    @CurrentUser() currentUser: Users
  ) {
    return this.scheduleService.getSchedules(airlineId, currentUser);
  }

  @SetMetadata('roles', [MembershipRole.ADMIN, MembershipRole.DISPATCHER])
  @UseGuards(roleGuard)
  @Put('/simbrief/:staticID')
  getSimbrief(@Param('staticID') staticID: string) {
    return this.scheduleService.getSimbrief(staticID);
  }

  @SetMetadata('roles', [MembershipRole.ADMIN, MembershipRole.DISPATCHER])
  @UseGuards(roleGuard)
  @Post('/simbrief')
  generateSimbrief(
    @Param('airlineId') airlineId: string,
    @CurrentUser() currentUser: Users,
    @Body() payload: CreateSimbriefDTO
  ) {
    return this.scheduleService.generateSimbrief(
      currentUser,
      airlineId,
      payload
    );
  }

  @SetMetadata('roles', [MembershipRole.ADMIN, MembershipRole.DISPATCHER])
  @UseGuards(roleGuard)
  @Delete('/:scheduleID')
  delete(
    @Param('airlineId') airlineId: string,
    @Param('scheduleID') scheduleID: string
  ) {
    return this.scheduleService.delete(airlineId, scheduleID);
  }
}
