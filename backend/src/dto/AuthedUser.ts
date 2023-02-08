import { Memberships, Users } from '@prisma/client';

export interface AuthedUser extends Users {
  memberships: Memberships[];
}
