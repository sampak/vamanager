import { Memberships, Users } from '@prisma/client';
import { User } from '@shared/base/User';
import { Membership } from '@shared/base/Membership';
import { UserStatus } from '@shared/base/UserStatus';

const PrismaUserToUser = (
  user: Users & { memberships?: Memberships[] }
): User => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    status: user.status as UserStatus,
    allowShowLastName: user.allowShowLastName,
    memberships: (user?.memberships as Membership[]) ?? [],
  };
};

export default PrismaUserToUser;
