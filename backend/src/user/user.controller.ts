import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { CurrentUser } from 'src/decorators/CurrentUser.decorator';
import { SentryInterceptor } from 'src/interceptors/SentryInterceptor';
import { UserService } from './user.service';

@UseInterceptors(SentryInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/memberships')
  async getMemberships(@CurrentUser() user) {
    return this.userService.getMemberships(user);
  }

  @Get('/me/:workspace?')
  async getMe(@CurrentUser() user) {
    return this.userService.getMe(user);
  }
}
