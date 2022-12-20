import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AirlineService } from './airline.service';
import { CreateAirlineDTO } from '@shared/dto/CreateAirlineDTO';
import { CurrentUser } from 'src/decorators/CurrentUser.decorator';
import { S3Client } from 'src/decorators/S3Client.decoratior';
import * as AWS from 'aws-sdk';
import { Users } from '@prisma/client';
@Controller('airline')
export class AirlineController {
  constructor(private readonly airlineService: AirlineService) {}

  @Post('/join/:airlineId')
  async join(
    @CurrentUser() currentUser,
    @Param('airlineId') airlineId: string
  ) {
    return await this.airlineService.join(currentUser, airlineId);
  }

  @Get(':airlineId/aircrafts')
  async getAircrafts(
    @CurrentUser() currentUser: Users,
    @Param('airlineId') airlineId: string
  ) {
    return await this.airlineService.getAircrafts(airlineId);
  }

  @Get('/')
  async getAll(@CurrentUser() CurrentUser) {
    return await this.airlineService.getAll();
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
