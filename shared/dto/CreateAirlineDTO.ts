import { IsJSON, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { JoiningMethod } from "../base/JoiningMethod";

export class CreateAirlineDTO {
  image?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  icao: string;

  @IsString()
  description?: string;

  @IsNotEmpty()
  joiningMethod: JoiningMethod;

  @IsUUID()
  base: string;

  @IsString()
  options: string;
}
