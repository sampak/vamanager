import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AirportModule } from './airport/airport.module';
import { AirlineModule } from './airline/airline.module';
import { AircraftModule } from './aircraft/aircraft.module';
@Module({
  imports: [AuthModule, UserModule, AirportModule, AirlineModule, AircraftModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
