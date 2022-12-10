import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AirportModule } from './airport/airport.module';
import { AirlineModule } from './airline/airline.module';
@Module({
  imports: [AuthModule, UserModule, AirportModule, AirlineModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
