import { Memberships, membership_role, prisma, Users } from '@prisma/client';
import { UserUIConfiguration } from '@shared/ui-configuration/user';

const getUserConfiguration = (
  prismaUser: Users & { memberships?: Memberships },
  memberships: Memberships[]
): UserUIConfiguration => {
  const actualMembership = prismaUser?.memberships?.[0];

  return {
    showOnbording: !memberships?.length ?? true,
    canManageAircrafts:
      actualMembership?.role === membership_role.ADMIN ?? false,
  };
};

export default getUserConfiguration;
