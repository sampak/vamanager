import { Body, Controller, Param, Post } from '@nestjs/common';
import { CurrentUser } from 'src/decorators/CurrentUser.decorator';
import { AuthedUser } from 'src/dto/AuthedUser';
import { TrackerService } from './tracker.service';
import { RequestTrackingDTO } from '@shared/dto/RequestTrackingDTO';

@Controller('airline/:airlineId/tracker')
export class TrackerController {
  constructor(private readonly trackerService: TrackerService) {}

  @Post('/request/:pirepId')
  async requestTracking(
    @CurrentUser() currentUser: AuthedUser,
    @Param('airlineId') airlineId: string,
    @Param('pirepId') pirepId: string,
    @Body() payload: RequestTrackingDTO
  ) {
    return await this.trackerService.requestTracking(
      currentUser,
      airlineId,
      pirepId,
      payload
    );
  }

  @Post('/track/:trackId')
  async trackFlight(
    @CurrentUser() currentUser: AuthedUser,
    @Param('airlineId') airlineId: string,
    @Param('trackId') pirepId: string,
    @Body() payload: RequestTrackingDTO
  ) {
    return await this.trackerService.trackFlight(
      currentUser,
      airlineId,
      pirepId,
      payload
    );
  }

  @Post('/event/:trackId')
  async eventFlight(
    @CurrentUser() currentUser: AuthedUser,
    @Param('airlineId') airlineId: string,
    @Param('trackId') pirepId: string,
    @Body() payload: RequestTrackingDTO
  ) {
    return await this.trackerService.eventFlight(
      currentUser,
      airlineId,
      pirepId,
      payload
    );
  }

  @Post('/submit/:trackId')
  async submitFlight(
    @CurrentUser() currentUser: AuthedUser,
    @Param('airlineId') airlineId: string,
    @Param('trackId') pirepId: string,
    @Body() payload: RequestTrackingDTO
  ) {
    return await this.trackerService.submitFlight(
      currentUser,
      airlineId,
      pirepId,
      payload
    );
  }
}
