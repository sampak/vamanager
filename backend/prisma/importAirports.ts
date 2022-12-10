import { PrismaClient, Airlines } from '@prisma/client';
import * as fs from 'fs';
const prisma = new PrismaClient();

const importAirports = async () => {
  let numberOfAirports = 0;
  const file = await fs.readFileSync('migrations/Airports.txt', {
    encoding: 'utf8',
    flag: 'r',
  });

  const lines: any = file.split('\n');

  try {
    prisma.$transaction(
      async (transactionPrisma) => {
        await transactionPrisma.airports.deleteMany({});

        return await Promise.all(
          lines
            .filter((line) => line[0] === 'A')
            .map((data, index) => {
              const line = data.split(',');
              const insertData = {
                icao: line[1] as string,
                name: line[2] as string,
                lat: Number(line[3]) as number,
                lng: Number(line[4]) as number,
                country: '',
                runwayLength: Number(line[8]) as number,
              };
              console.log(
                `Airport ${insertData.name}(${insertData.icao}) has been imported ${index}`
              );
              return transactionPrisma.airports.create({ data: insertData });
            })
        );
      },
      {
        timeout: 30000,
      }
    );
    prisma.$disconnect();
  } catch (e) {
    console.log(e);
    console.log('rollback');
    prisma.$disconnect();
  }
};
importAirports();
