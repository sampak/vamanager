import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TypeOfSchedule } from "../base/TypeOfSchedule";

export class CreateSimbriefDTO {
  @IsString()
  @IsOptional()
  callsign?: string;

  @IsString()
  @IsNotEmpty()
  flightNumber: string;

  @IsString()
  @IsNotEmpty()
  origin: string;

  @IsString()
  @IsNotEmpty()
  type: TypeOfSchedule;

  @IsNotEmpty()
  costIndex: number;

  @IsString()
  @IsNotEmpty()
  destination: string;

  @IsString()
  @IsNotEmpty()
  aircraft: string;

  @IsNotEmpty()
  day: Date;

  @IsNotEmpty()
  weekDay: string;

  @IsString()
  @IsOptional()
  route?: string;
}
