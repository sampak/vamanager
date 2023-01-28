import { IsDate, IsNotEmpty, IsString } from "class-validator";
import { TypeOfSchedule } from "../base/TypeOfSchedule";

export class CreateAirlineDTO {
  @IsString()
  @IsNotEmpty()
  type: TypeOfSchedule;

  @IsString()
  @IsNotEmpty()
  origin: string;

  @IsString()
  destination?: string;

  @IsNotEmpty()
  @IsDate()
  day: Date;
}
