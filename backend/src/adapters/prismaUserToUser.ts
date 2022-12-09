import { Users } from '@prisma/client';
import { User } from '@shared/base/User';
import { UserStatus } from '@shared/base/UserStatus';

const PrismaUserToUser = (user: Users): User => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    status: user.status as UserStatus,
    allowShowLastName: user.allowShowLastName,
  };
};

export default PrismaUserToUser;
