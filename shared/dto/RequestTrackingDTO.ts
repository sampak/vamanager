import {
  IsBoolean,
  IsJSON,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from "class-validator";
import { EventType } from "../base/EventType";
import { FlightPhase } from "../base/FlightPhase.enum";
import { GearState } from "../base/GearState.enum";

export class RequestTrackingDTO {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsNumber()
  @IsNotEmpty()
  lat: number;

  @IsNumber()
  @IsNotEmpty()
  lng: number;

  @IsNumber()
  @IsNotEmpty()
  ias: number;

  @IsNumber()
  @IsNotEmpty()
  heading: number;

  @IsNumber()
  @IsNotEmpty()
  vs: number;

  @IsNumber()
  @IsNotEmpty()
  gs: number;

  @IsNumber()
  @IsNotEmpty()
  altitude: number;

  @IsString()
  @IsNotEmpty()
  sim_time: string;

  @IsString()
  @IsNotEmpty()
  engines: string;

  @IsString()
  @IsNotEmpty()
  gearState: GearState;

  @IsNumber()
  @IsNotEmpty()
  flaps: number;

  @IsNumber()
  @IsNotEmpty()
  fuel: number;

  @IsNumber()
  @IsNotEmpty()
  weight: number;

  @IsBoolean()
  @IsNotEmpty()
  stall: boolean;

  @IsBoolean()
  @IsNotEmpty()
  overspeed: boolean;

  @IsBoolean()
  @IsNotEmpty()
  sim_paused: boolean;

  @IsString()
  @IsNotEmpty()
  transponder: string;

  @IsBoolean()
  @IsNotEmpty()
  onGround: boolean;

  @IsString()
  @IsNotEmpty()
  flight_phase: FlightPhase;

  @IsString()
  eventType: EventType;

  @IsNumber()
  rate: number;
}
