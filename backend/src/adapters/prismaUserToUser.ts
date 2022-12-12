import { Memberships, Users } from '@prisma/client';
import { User } from '@shared/base/User';
import { Membership } from '@shared/base/Membership';
import { UserStatus } from '@shared/base/UserStatus';
import getUserConfiguration from 'src/ui-configuration/user';
import prismaMembershipToMembership from './prismaMembershipToMembership';

const PrismaUserToUser = (
  user: Users & { memberships?: Memberships },
  memberships?: Memberships[]
): User => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    status: user.status as UserStatus,
    allowShowLastName: user.allowShowLastName,
    membership: user?.memberships?.[0]
      ? prismaMembershipToMembership(user?.memberships?.[0])
      : null,
    uiConfiguration: getUserConfiguration(user, memberships),
  };
};

export default PrismaUserToUser;
