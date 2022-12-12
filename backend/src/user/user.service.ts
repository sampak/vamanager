import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Users } from '@prisma/client';
import PrismaUserToUser from 'src/adapters/prismaUserToUser';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getMe(prismaUser: Users) {
    console.log(prismaUser);
    const user = PrismaUserToUser(prismaUser);
    return user;
  }
}
