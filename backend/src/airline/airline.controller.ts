import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  SetMetadata,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AirlineService } from './airline.service';
import { CreateAirlineDTO } from '@shared/dto/CreateAirlineDTO';
import { CurrentUser } from 'src/decorators/CurrentUser.decorator';
import { S3Client } from 'src/decorators/S3Client.decoratior';
import * as AWS from 'aws-sdk';
import { Memberships, Users } from '@prisma/client';
import { UsersSearchOrder } from '@shared/dto/UsersSearchDTO';
import { roleGuard } from 'src/guards/role.guard';
import { MembershipRole } from '@shared/base/MembershipRole';
import { InviteUserDTO } from '@shared/dto/InviteUserDTO';
import { SentryInterceptor } from 'src/interceptors/SentryInterceptor';
import { AuthedUser } from 'src/dto/AuthedUser';
@UseInterceptors(SentryInterceptor)
@Controller('airline')
export class AirlineController {
  constructor(private readonly airlineService: AirlineService) {}

  @SetMetadata('roles', [MembershipRole.ADMIN])
  @UseGuards(roleGuard)
  @Post(':workspace/users')
  async invite(
    @CurrentUser() currentUser: Users,
    @Body() payload: InviteUserDTO,
    @Param('workspace') workspaceId: string
  ) {
    return await this.airlineService.invite(currentUser, workspaceId, payload);
  }

  @Post('/join/:airlineID')
  async join(
    @CurrentUser() currentUser,
    @Param('airlineID') airlineId: string
  ) {
    return await this.airlineService.join(currentUser, airlineId);
  }

  @Get(':airlineId/aircrafts')
  async getAircrafts(
    @CurrentUser() currentUser: AuthedUser,
    @Param('airlineId') airlineId: string
  ) {
    return await this.airlineService.getAircrafts(currentUser, airlineId);
  }

  @Get('/')
  async getAll(@CurrentUser() CurrentUser) {
    return await this.airlineService.getAll(CurrentUser);
  }

  @Get(':workspace/users/:searchParams?')
  async getUsers(
    @CurrentUser() currentUser,
    @Query('name') name: string,
    @Query('orderBy') orderBy: UsersSearchOrder,
    @Param('workspace') airlineId: string
  ) {
    return await this.airlineService.getUsers(
      currentUser,
      airlineId,
      name,
      orderBy
    );
  }

  @Post('/')
  async create(
    @S3Client() S3Client: AWS.S3,
    @CurrentUser() currentUser,
    @Body() payload: CreateAirlineDTO
  ) {
    return await this.airlineService.create(S3Client, currentUser, payload);
  }
}
