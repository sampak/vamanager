import { ScheduleUIConfiguration } from "../ui-configuration/schedule";
import Airport from "./Airport";
import TypeOfAircraft from "./TypeOfAircraft";
import { TypeOfFlight } from "./TypeOfFlight";
import { TypeOfSchedule } from "./TypeOfSchedule";

export default interface Schedule {
  id: string;
  type: TypeOfSchedule;
  callsign: string;
  flightNumber: string;
  airlineId: string;
  originId: string;
  destinationId: string;
  typeOfAircraftId: string;
  flightTime: number;
  costIndex: string;
  recommendedRoute: string;
  airDistance: number;
  day: Date;
  origin?: Airport;
  destination?: Airport;
  typeOfAircraft?: TypeOfAircraft;
  typeOfFlight?: TypeOfFlight;
  salary?: number;
  uiConfiguration?: ScheduleUIConfiguration;
}
