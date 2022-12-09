import { IsString, IsEmail, IsNotEmpty, IsBoolean } from "class-validator";

export class RegisterDTO {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsBoolean()
  allowShowLastName?: boolean;
}
