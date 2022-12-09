import { IsString, IsEmail, IsNotEmpty } from "class-validator";

export class RegisterDTO {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
