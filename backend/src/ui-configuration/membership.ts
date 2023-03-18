import {
  Airlines,
  Memberships,
  membership_role,
  membership_status,
  Pireps,
  pirep_status,
  Users,
} from '@prisma/client';
import { MembershipUIConfiguration } from '@shared/ui-configuration/membership';
import { AuthedUser } from 'src/dto/AuthedUser';

const getMembershipConfiguration = (
  prismaMembership: Memberships & { user?: Users },
  currentUser: AuthedUser,
  company?: Airlines,
  pireps?: Pireps[]
): MembershipUIConfiguration => {
  const currentUserMembership = currentUser.memberships[0];
  const isAdmin =
    currentUserMembership?.role === membership_role.ADMIN ?? false;
  const isOwner = company?.ownerId === prismaMembership?.userId;

  const isDelayedPirep = false;
  const pirepsIsEmpty = !pireps?.length ?? false;

  const isScheduledPirep =
    !isDelayedPirep &&
    !!pireps?.find((pirep) => pirep.status === pirep_status.CREATED);

  return {
    canActive:
      (prismaMembership?.status === membership_status.WAITING_APPROVAL ||
        prismaMembership?.status === membership_status.DISABLED) &&
      isAdmin,
    canDisable:
      !isOwner &&
      prismaMembership?.status === membership_status.ACTIVE &&
      isAdmin,
    canChangeRole: isAdmin,
    canResendInvite:
      isAdmin && prismaMembership?.status === membership_status.WAITING_TO_JOIN,
    noPirepsHeader: pirepsIsEmpty ?? false,
    isDelayedPirepHeader: isDelayedPirep ?? false,
    scheduledPirepsHeader: isScheduledPirep ?? false,
  };
};

export default getMembershipConfiguration;
