import { PrismaClient, Airlines } from '@prisma/client';
import * as fs from 'fs';
import * as csv from 'csv-parser';
const prisma = new PrismaClient();

const importAirports = async () => {
  let numberOfAirports = 0;
  let airports = [];
  fs.createReadStream('migrations/airports.csv')
    .pipe(csv())
    .on('data', async (row) => {
      if (row.name.search('Military') !== -1) return;
      if (row.type === 'large_airport' || row.type === 'medium_airport') {
        const icao = row.ident;
        const iata = row.iata;
        const elevation_ft = row.elevation_ft;
        const name = row.name;
        const keywords = row.keywords;
        const country = row.iso_country;
        const lat = row.latitude_deg;
        const lng = row.longitude_deg;
        const size = row.type;
        const passangers = row.type === 'large_airport' ? 300 : 150;
        airports.push({
          icao: icao,
          iata: iata,
          elevation_ft: Number(elevation_ft) as Number,
          name: name,
          keywords: keywords,
          country: country,
          lat: Number(lat) as Number,
          lng: Number(lng) as Number,
          size: size,
          passangers: passangers,
        });
      }
    })
    .on('end', async () => {
      try {
        await prisma.airports.deleteMany({});

        airports.map(async (airport) => {
          return await prisma.airports.create({
            data: {
              icao: airport.icao,
              iata: airport.iata ?? '',
              elevation_ft: Number(airport.elevation_ft) as number,
              name: airport.name,
              keywords: airport.keywords,
              country: airport.country,
              lat: Number(airport.lat) as number,
              lng: Number(airport.lng) as number,
              size: airport.size,
              passangers: airport.passangers,
            },
          });
        });

        console.log('Migration airport completed imported: ' + airports.length);
      } catch (e) {
        console.log(e);
        console.log('migration airports failed');
        prisma.$disconnect();
      }
    });
};

importAirports();
