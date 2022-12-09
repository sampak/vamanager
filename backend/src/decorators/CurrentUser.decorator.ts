import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CurrentUserPipe } from '../pipes/CurrentUser.pipe';

const GetUser = createParamDecorator((_, ctx: ExecutionContext) => {
  return ctx.switchToHttp().getRequest().headers.authorization;
});

export const CurrentUser = (additionalOptions?: any) =>
  GetUser(additionalOptions, CurrentUserPipe);
