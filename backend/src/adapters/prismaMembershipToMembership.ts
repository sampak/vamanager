import { Airlines, Memberships, Users } from '@prisma/client';
import { UserStatus } from '@shared/base/UserStatus';
import { Membership } from '@shared/base/Membership';
import { MembershipStatus } from '@shared/base/MembershipStatus';
import { MembershipRole } from '@shared/base/MembershipRole';

const prismaMembershipToMembership = (
  membership: Memberships & { airline?: Airlines }
): Membership => {
  return {
    id: membership.id,
    airlineId: membership.airlineId,
    userId: membership.userId,
    status: membership.status as MembershipStatus,
    role: membership.role as MembershipRole,
  };
};

export default prismaMembershipToMembership;
