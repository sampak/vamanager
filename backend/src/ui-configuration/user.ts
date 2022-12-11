import { Memberships, prisma, Users } from '@prisma/client';
import { UserUIConfiguration } from '@shared/ui-configuration/user';

const getUserConfiguration = (
  prismaUser: Users & { memberships?: Memberships[] }
): UserUIConfiguration => {
  return {
    showOnbording: !prismaUser?.memberships?.length ?? true,
  };
};

export default getUserConfiguration;
