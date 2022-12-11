import { Body, Controller, Post } from '@nestjs/common';
import { AirlineService } from './airline.service';
import { CreateAirlineDTO } from '@shared/dto/CreateAirlineDTO';
import { CurrentUser } from 'src/decorators/CurrentUser.decorator';
import { S3Client } from 'src/decorators/S3Client.decoratior';
import * as AWS from 'aws-sdk';
@Controller('airline')
export class AirlineController {
  constructor(private readonly airlineService: AirlineService) {}

  @Post('/')
  async create(
    @S3Client() S3Client: AWS.S3,
    @CurrentUser() currentUser,
    @Body() payload: CreateAirlineDTO
  ) {
    return await this.airlineService.create(S3Client, currentUser, payload);
  }
}
