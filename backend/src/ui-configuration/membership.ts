import {
  Airlines,
  Memberships,
  membership_role,
  membership_status,
  Users,
} from '@prisma/client';
import { MembershipUIConfiguration } from '@shared/ui-configuration/membership';
import { AuthedUser } from 'src/dto/AuthedUser';

const getMembershipConfiguration = (
  prismaMembership: Memberships & { user?: Users },
  currentUser: AuthedUser,
  company?: Airlines
): MembershipUIConfiguration => {
  const currentUserMembership = currentUser.memberships[0];
  const isAdmin = currentUserMembership.role === membership_role.ADMIN ?? false;
  const isOwner = company?.ownerId === prismaMembership.userId;

  return {
    canActive:
      (prismaMembership.status === membership_status.WAITING_APPROVAL ||
        prismaMembership.status === membership_status.DISABLED) &&
      isAdmin,
    canDisable:
      !isOwner &&
      prismaMembership.status === membership_status.ACTIVE &&
      isAdmin,
    canChangeRole: isAdmin,
    canResendInvite:
      prismaMembership.status === membership_status.WAITING_TO_JOIN,
  };
};

export default getMembershipConfiguration;
