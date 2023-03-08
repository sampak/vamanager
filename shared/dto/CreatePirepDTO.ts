import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreatePirepDTO {
  @IsString()
  @IsNotEmpty()
  callsign: string;

  @IsString()
  @IsNotEmpty()
  aircraftID: string;
}
