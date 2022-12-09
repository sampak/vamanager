// parse-token.pipe.ts
import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Users, Prisma } from '@prisma/client';
import { config } from 'src/config';
@Injectable()
export class CurrentUserPipe implements PipeTransform {
  constructor() {}

  async transform(token: string) {
    if (!token) {
      return null;
    }

    try {
      const access_token = token.replace('Bearer ', '');
      const user = await jwt.verify(access_token, config.jwt.secret);
      return user as Users;
    } catch (e) {
      console.error(e);
      throw new HttpException('', HttpStatus.UNAUTHORIZED);
    }
  }
}
