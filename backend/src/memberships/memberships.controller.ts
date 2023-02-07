import {
  Body,
  Controller,
  Param,
  Put,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { MembershipsService } from './memberships.service';
import { MembershipRole } from '@shared/base/MembershipRole';
import { updateRoleDTO } from '@shared/dto/updateRoleDTO';
import { UpdateMembershipStatusDTO } from '@shared/dto/UpdateMembershipStatusDTO';
import { roleGuard } from 'src/guards/role.guard';
import { CurrentUser } from 'src/decorators/CurrentUser.decorator';
import { Memberships, Users } from '@prisma/client';

@Controller('airline/:airlineId/memberships')
export class MembershipsController {
  constructor(private readonly membershipService: MembershipsService) {}

  @SetMetadata('roles', [MembershipRole.ADMIN])
  @UseGuards(roleGuard)
  @Put('/:membershipID/role')
  async updateRole(
    @CurrentUser()
    currentUser: Users & { memberships: Memberships[] },
    @Param('membershipID') membershipID: string,
    @Body() payload: updateRoleDTO
  ) {
    return await this.membershipService.updateRole(
      currentUser,
      membershipID,
      payload
    );
  }

  @SetMetadata('roles', [MembershipRole.ADMIN])
  @UseGuards(roleGuard)
  @Put('/:membershipID/status')
  async updateStatus(
    @CurrentUser()
    currentUser: Users & { memberships: Memberships[] },
    @Param('membershipID') membershipID: string,
    @Body() payload: UpdateMembershipStatusDTO
  ) {
    return await this.membershipService.updateStatus(
      currentUser,
      membershipID,
      payload
    );
  }

  @SetMetadata('roles', [MembershipRole.ADMIN])
  @UseGuards(roleGuard)
  @Put('/:membershipID/reinvite')
  async resendInvite(
    @CurrentUser()
    currentUser: Users & { memberships: Memberships[] },
    @Param('membershipID') membershipID: string
  ) {
    return await this.membershipService.resendInvite(currentUser, membershipID);
  }
}
