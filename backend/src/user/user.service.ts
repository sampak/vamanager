import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Users } from '@prisma/client';
import PrismaUserToUser from 'src/adapters/prismaUserToUser';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getMe(jwtUser: Users) {
    try {
      const prismaUser = await this.prisma.users.findUniqueOrThrow({
        where: { id: jwtUser.id },
      });

      const user = PrismaUserToUser(prismaUser);
      user.showOnbording = true;
      return user;
    } catch (e) {
      throw new UnauthorizedException('');
    }
  }
}
