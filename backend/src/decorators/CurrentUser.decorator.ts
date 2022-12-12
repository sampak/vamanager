import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CurrentUserPipe } from '../pipes/CurrentUser.pipe';

const GetUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return {
    token: request.headers.authorization,
    workspace: request.params.workspace,
  };
});

export const CurrentUser = (additionalOptions?: any) =>
  GetUser(additionalOptions, CurrentUserPipe);
