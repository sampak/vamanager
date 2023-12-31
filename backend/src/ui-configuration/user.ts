import { Memberships, membership_role, prisma, Users } from '@prisma/client';
import { UserUIConfiguration } from '@shared/ui-configuration/user';
import { AuthedUser } from 'src/dto/AuthedUser';

const getUserConfiguration = (
  prismaUser: AuthedUser,
  memberships: Memberships[]
): UserUIConfiguration => {
  const membership = prismaUser?.memberships?.[0];

  return {
    showOnbording: !memberships?.length ?? true,
    createSchedules:
      membership?.role === membership_role.ADMIN ||
      membership?.role === membership_role.DISPATCHER,
    canManageAircrafts: membership?.role === membership_role.ADMIN ?? false,
    canInviteUsers: membership?.role === membership_role.ADMIN ?? false,
  };
};

export default getUserConfiguration;
