import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AirportModule } from './airport/airport.module';
import { AirlineModule } from './airline/airline.module';
import { AircraftModule } from './aircraft/aircraft.module';
import { ScheduleModule } from './schedule/schedule.module';
import { MembershipsModule } from './memberships/memberships.module';
@Module({
  imports: [AuthModule, UserModule, AirportModule, AirlineModule, AircraftModule, ScheduleModule, MembershipsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
