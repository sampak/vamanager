import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/prisma.service';
import { config } from 'src/config';

@Injectable()
export class roleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prismaService: PrismaService
  ) {}

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get('roles', context.getHandler());
    if (!roles) return false;

    const req = context.switchToHttp().getRequest();

    const workspace = req.params.airlineId;

    if (!workspace) return false;

    try {
      const access_token = req.headers.authorization.replace('Bearer ', '');
      const jwtUser = await jwt.verify(access_token, config.jwt.secret);

      const airline = await this.prismaService.airlines.findFirst({
        where: { icao: workspace },
      });

      if (!airline) return false;

      const membership = await this.prismaService.memberships.findFirst({
        where: { airlineId: airline.id, userId: jwtUser.id },
      });

      if (!membership) return false;
      const isPermission = roles.includes(membership.role);

      if (!isPermission) return false;

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
