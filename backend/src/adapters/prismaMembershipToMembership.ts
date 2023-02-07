import { Airlines, Memberships, Users } from '@prisma/client';
import { UserStatus } from '@shared/base/UserStatus';
import { Membership } from '@shared/base/Membership';
import { MembershipStatus } from '@shared/base/MembershipStatus';
import { MembershipRole } from '@shared/base/MembershipRole';
import prismaAirlineToAirline from './prismaAirlineToAirline';
import PrismaUserToUser from './prismaUserToUser';

const prismaMembershipToMembership = (
  membership: Memberships & { airline?: Airlines; user?: Users },
  permittedToSeeFullData = false
): Membership => {
  let status = membership.status as MembershipStatus;

  if (!permittedToSeeFullData && status !== MembershipStatus.ACTIVE) {
    status = MembershipStatus.NON_ACTIVE;
  }

  return {
    id: membership.id,
    airlineId: membership.airlineId,
    userId: membership.userId,
    status: status,
    rating: membership.rating,
    role: membership.role as MembershipRole,
    user: membership.user
      ? PrismaUserToUser(
          membership.user,
          permittedToSeeFullData,
          !permittedToSeeFullData
        )
      : null,
    airline: membership.airline
      ? prismaAirlineToAirline(membership.airline)
      : null,
  };
};

export default prismaMembershipToMembership;
