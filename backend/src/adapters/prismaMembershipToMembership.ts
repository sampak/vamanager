import { Airlines, Memberships, Users } from '@prisma/client';
import { UserStatus } from '@shared/base/UserStatus';
import { Membership } from '@shared/base/Membership';
import { MembershipStatus } from '@shared/base/MembershipStatus';

const prismaMembershipToMembership = (
  membership: Memberships & { airline?: Airlines }
): Membership => {
  return {
    id: membership.id,
    airlineId: membership.airlineId,
    userId: membership.userId,
    status: membership.status as MembershipStatus,
  };
};

export default prismaMembershipToMembership;
