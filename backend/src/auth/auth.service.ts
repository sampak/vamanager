import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RegisterDTO } from '@shared/dto/RegisterDTO';
import { LoginDTO } from '@shared/dto/LoginDTO';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { config } from 'src/config';
import jwt from '../utils/jwt';
import PrismaUserToUser from 'src/adapters/prismaUserToUser';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signIn(payload: LoginDTO) {
    try {
      const prismaUser = await this.prisma.users.findUniqueOrThrow({
        where: { email: payload.email },
      });

      if (bcrypt.compareSync(payload.password, prismaUser.password)) {
        return jwt.genToken(PrismaUserToUser(prismaUser));
      }

      throw new BadRequestException('NOT_FOUND');
    } catch (e) {
      throw new BadRequestException('NOT_FOUND');
    }
  }

  async signUp(payload: RegisterDTO): Promise<string> {
    const existUser = await this.prisma.users.findUnique({
      where: { email: payload.email },
    });

    if (existUser) {
      throw new BadRequestException('EMAIL_EXIST');
    }

    const salt = await bcrypt.genSaltSync(config.saltRounds);
    payload.password = bcrypt.hashSync(payload.password, salt);
    const newUser = PrismaUserToUser(
      await this.prisma.users.create({ data: payload })
    );

    return jwt.genToken(newUser);
  }
}
