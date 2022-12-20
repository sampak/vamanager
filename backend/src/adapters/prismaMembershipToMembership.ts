import { Airlines, Memberships, Users } from '@prisma/client';
import { UserStatus } from '@shared/base/UserStatus';
import { Membership } from '@shared/base/Membership';
import { MembershipStatus } from '@shared/base/MembershipStatus';
import { MembershipRole } from '@shared/base/MembershipRole';
import prismaAirlineToAirline from './prismaAirlineToAirline';

const prismaMembershipToMembership = (
  membership: Memberships & { airline?: Airlines }
): Membership => {
  return {
    id: membership.id,
    airlineId: membership.airlineId,
    userId: membership.userId,
    status: membership.status as MembershipStatus,
    rating: membership.rating,
    role: membership.role as MembershipRole,
    airline: membership.airline
      ? prismaAirlineToAirline(membership.airline)
      : null,
  };
};

export default prismaMembershipToMembership;
