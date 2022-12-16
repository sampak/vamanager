import { Memberships, Users } from '@prisma/client';
import { User } from '@shared/base/User';
import { UserStatus } from '@shared/base/UserStatus';

const PrismaUserToUser = (user: Users, forceShowLastName?: boolean): User => {
  const showLastName = user.allowShowLastName;
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: showLastName || forceShowLastName ? user.lastName : '',
    email: user.email,
    status: user.status as UserStatus,
    allowShowLastName: showLastName,
  };
};

export default PrismaUserToUser;
