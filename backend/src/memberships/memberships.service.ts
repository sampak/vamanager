import { BadRequestException, Injectable } from '@nestjs/common';
import {
  Airlines,
  Memberships,
  membership_role,
  membership_status,
  Pireps,
  prisma,
  Users,
  users_status,
} from '@prisma/client';
import { updateRoleDTO } from '@shared/dto/updateRoleDTO';
import { UpdateMembershipStatusDTO } from '@shared/dto/UpdateMembershipStatusDTO';
import { PrismaService } from 'src/prisma.service';
import { config } from 'src/config';
import emails from 'src/utils/emails';
import { InvitationEmail } from '@shared/emails/Invitation.email';
import { AuthedUser } from 'src/dto/AuthedUser';
import * as moment from 'moment';
import { groupByDates } from 'src/utils/groupByDates';

@Injectable()
export class MembershipsService {
  constructor(private readonly prismaService: PrismaService) {}

  async updateRole(
    currentUser: AuthedUser,
    membershipId: string,
    payload: updateRoleDTO
  ) {
    const currentUserMembership = currentUser.memberships[0];

    const company = await this.prismaService.airlines.findFirst({
      where: { id: currentUserMembership.airlineId },
    });

    if (!company) {
      throw new BadRequestException('NOT_FOUND_COMPANY');
    }

    if (company.ownerId === membershipId) {
      throw new BadRequestException('OWN_COMPANY');
    }

    const membership = await this.prismaService.memberships.findFirst({
      where: {
        id: membershipId,
        airlineId: currentUserMembership.airlineId,
      },
    });

    if (!membership) {
      throw new BadRequestException('NOT_FOUND');
    }

    await this.prismaService.memberships.update({
      data: {
        role: payload.role as membership_role,
      },
      where: {
        id: membership.id,
      },
    });

    return { action: 'UPDATE', key: membership.id };
  }

  async updateStatus(
    currentUser: AuthedUser,
    membershipId: string,
    payload: UpdateMembershipStatusDTO
  ) {
    const currentUserMembership = currentUser.memberships[0];

    const company = await this.prismaService.airlines.findFirst({
      where: { id: currentUserMembership.airlineId },
    });

    if (!company) {
      throw new BadRequestException('NOT_FOUND_COMPANY');
    }

    if (company.ownerId === membershipId) {
      throw new BadRequestException('OWN_COMPANY');
    }

    const membership = await this.prismaService.memberships.findFirst({
      where: {
        id: membershipId,
        airlineId: currentUserMembership.airlineId,
      },
    });

    if (!membership) {
      throw new BadRequestException('NOT_FOUND');
    }

    await this.prismaService.memberships.update({
      data: {
        status: payload.status,
      },
      where: {
        id: membership.id,
      },
    });

    return { action: 'UPDATE', key: membership.id };
  }

  async resendInvite(currentUser: AuthedUser, membershipId: string) {
    const currentUserMembership = currentUser.memberships[0];
    const company = await this.prismaService.airlines.findFirst({
      where: { id: currentUserMembership.airlineId },
    });

    if (!company) {
      throw new BadRequestException('COMPANY');
    }

    const membership = await this.prismaService.memberships.findFirst({
      where: {
        id: membershipId,
        airlineId: currentUserMembership.airlineId,
      },
    });

    if (!membership) {
      throw new BadRequestException('MEMBERSHIP');
    }

    const prismaUser = await this.prismaService.users.findFirst({
      where: {
        id: membership.userId,
      },
    });

    let link = `${config.frontendUrl}/auth/signin?company=${membership.id}&email=${prismaUser.email}`;

    if (prismaUser.status === users_status.WAITING_TO_JOIN) {
      link = `${config.frontendUrl}/auth/signup?company=${membership.id}&email=${prismaUser.email}`;
    }

    emails.sendEmail(prismaUser.email, emails.Templates.INVITATION, {
      subject: `VAManager - You've been invited to a ${company.name}`,
      name: company.name,
      icao: company.icao,
      firstName: currentUser.firstName,
      email: currentUser.email,
      image: company.image,
      link: link,
    } as InvitationEmail);

    return { action: 'CREATE', value: membership.id };
  }

  async getChart(currentUser: AuthedUser, airlineId, membershipID: string) {
    const company = await this.prismaService.airlines.findFirst({
      where: {
        icao: airlineId,
      },
    });

    const membership = await this.prismaService.memberships.findFirst({
      where: {
        airlineId: company.id,
        id: membershipID,
      },
    });

    const history = 30;
    const startDate = moment(new Date())
      .subtract(history, 'days')
      .startOf('day');
    const endDate = moment().startOf('day');

    const prismaPireps = await this.prismaService.pireps.findMany({
      where: {
        airlineId: company.id,
        pilotId: membership.userId,
        createdAt: {
          gt: startDate.toDate(),
        },
      },
    });

    const historyDates = await groupByDates(prismaPireps, startDate, endDate);
    return historyDates;
  }
}
