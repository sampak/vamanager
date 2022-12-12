import { Memberships, prisma, Users } from '@prisma/client';
import { UserUIConfiguration } from '@shared/ui-configuration/user';

const getUserConfiguration = (
  prismaUser: Users & { memberships?: Memberships },
  memberships: Memberships[]
): UserUIConfiguration => {
  return {
    showOnbording: !memberships?.length ?? true,
  };
};

export default getUserConfiguration;
