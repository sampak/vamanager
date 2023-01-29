import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { RegisterDTO } from '@shared/dto/RegisterDTO';
import { LoginDTO } from '@shared/dto/LoginDTO';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { config } from 'src/config';
import jwt from '../utils/jwt';
import PrismaUserToUser from 'src/adapters/prismaUserToUser';
import { users_status } from '@prisma/client';
import makeId from 'src/utils/makeId';
import emails from 'src/utils/emails';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signIn(payload: LoginDTO) {
    try {
      const prismaUser = await this.prisma.users.findUniqueOrThrow({
        where: { email: payload.email },
        include: {
          verificationCodes: true,
        },
      });

      if (bcrypt.compareSync(payload.password, prismaUser.password)) {
        if (prismaUser.status === users_status.PENDING_CODE) {
          if (prismaUser?.verificationCodes?.[0]) {
            throw new ForbiddenException({
              id: prismaUser.id,
            });
          }

          return jwt.genToken(PrismaUserToUser(prismaUser, true));
        }
        return jwt.genToken(PrismaUserToUser(prismaUser, true));
      }

      throw new BadRequestException('NOT_FOUND');
    } catch (e) {
      if (e.status) {
        throw e;
      }
      throw new BadRequestException('NOT_FOUND');
    }
  }

  async signUp(payload: RegisterDTO): Promise<{ key: string; id: string }> {
    const existUser = await this.prisma.users.findUnique({
      where: { email: payload.email },
    });

    if (existUser) {
      throw new BadRequestException('EMAIL_EXIST');
    }
    const salt = await bcrypt.genSaltSync(Number(config.saltRounds));
    payload.password = bcrypt.hashSync(payload.password, salt);
    const newUser = PrismaUserToUser(
      await this.prisma.users.create({
        data: { ...payload, status: users_status.PENDING_CODE },
      }),
      true
    );

    const code = await this.prisma.verificationCodes.create({
      data: {
        userId: newUser.id,
        code: makeId(6),
      },
    });

    emails.sendEmail(
      emails.Templates.REGISTRATION_CODE,
      {
        code: code.code,
      },
      newUser.email,
      'VAManager - Verification Code'
    );

    return { key: 'CREATE', id: newUser.id };
  }

  async code(payload) {
    const prismaCode = await this.prisma.verificationCodes.findFirst({
      where: {
        userId: payload.id,
        code: payload.code,
      },
      include: {
        user: true,
      },
    });

    if (!prismaCode) {
      throw new BadRequestException();
    }

    await this.prisma.users.update({
      where: { id: payload.userId },
      data: {
        status: users_status.ACTIVE,
      },
    });

    const prismaUser = await this.prisma.users.findFirst({
      where: {
        id: payload.id,
      },
    });

    return jwt.genToken(PrismaUserToUser(prismaUser, true));
  }

  async resendCode(userId: string) {
    const prismaCode = await this.prisma.verificationCodes.findFirst({
      where: {
        userId: userId,
      },
      include: {
        user: true,
      },
    });

    if (!prismaCode) {
      throw new BadRequestException();
    }

    emails.sendEmail(
      emails.Templates.REGISTRATION_CODE,
      {
        code: prismaCode.code,
      },
      prismaCode.user.email,
      'VAManager - Verification Code'
    );

    return { id: userId, key: 'CREATED' };
  }
}
