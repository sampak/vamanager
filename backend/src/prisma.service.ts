import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, 'query' | 'error'>
  implements OnModuleInit
{
  async onModuleInit() {
    this.$on('query', (e) => {
      // console.log('Query: ' + e.query);
      // console.log('Params: ' + e.params);
      // console.log('Duration: ' + e.duration + 'ms');
    });
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
