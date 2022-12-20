import { Controller, Get } from '@nestjs/common';
import { CurrentUser } from 'src/decorators/CurrentUser.decorator';
import { UserService } from './user.service';

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
