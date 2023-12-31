import { User } from '@shared/base/User';

export const getLettersFromName = (user: User) => {
  return user.firstName
    ? `${user?.firstName?.charAt(0)}${user?.lastName?.charAt(0)}`
    : user?.email?.charAt(0).toUpperCase();
};
