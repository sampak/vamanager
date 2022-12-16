import { Airlines, Memberships, Users } from '@prisma/client';
import Airline from '@shared/base/Airline';
import { JoiningMethod } from '@shared/base/JoiningMethod';
import prismaMembershipToMembership from './prismaMembershipToMembership';
import PrismaUserToUser from './prismaUserToUser';

const prismaAirlineToAirline = (
  airline: Airlines & { owner?: Users; memberships?: Memberships[] }
): Airline => {
  return {
    id: airline.id,
    image: airline?.image,
    baseId: airline.baseId,
    ownerId: airline.ownerId,
    name: airline.name,
    icao: airline.icao,
    rating: airline.rating / 100,
    joining_type: airline.joining_type as JoiningMethod,
    memberships: airline?.memberships.map((membership) =>
      prismaMembershipToMembership(membership)
    ),
    owner: PrismaUserToUser(airline.owner),
  };
};

export default prismaAirlineToAirline;
