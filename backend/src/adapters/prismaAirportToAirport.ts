import { Airports } from '@prisma/client';
import Airport from '@shared/base/Airport';

const prismaAirportToAirport = (airport: Airports): Airport => {
  return {
    id: airport.id,
    icao: airport.icao,
    iata: airport.iata,
    elevation_ft: airport.elevation_ft,
    name: airport.name,
    keywords: airport.keywords,
    country: airport.country,
    lat: airport.lat,
    lng: airport.lng,
    passangers: airport.passangers,
  };
};

export default prismaAirportToAirport;
