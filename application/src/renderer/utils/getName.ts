import { User } from '@shared/base/User';

export const getName = (user: User) => {
  return user?.firstName ? `${user.firstName} ${user?.lastName}` : user.email;
};
