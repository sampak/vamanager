import { Airlines } from '@prisma/client';
import Airline from '@shared/base/Airline';

const prismaAirlineToAirline = (airline: Airlines): Airline => {
  return {
    id: airline.id,
    image: airline?.image,
    baseId: airline.baseId,
    ownerId: airline.ownerId,
    name: airline.name,
    icao: airline.icao,
  };
};

export default prismaAirlineToAirline;
