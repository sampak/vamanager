import { IsNotEmpty, IsString } from "class-validator";

export class BuyAircraftDTO {
  @IsString()
  @IsNotEmpty()
  registration: string;
}
