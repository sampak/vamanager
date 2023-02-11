import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreatePirepDTO {
  @IsString()
  @IsNotEmpty()
  aircraftID: string;
}
