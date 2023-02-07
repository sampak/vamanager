import { IsEmail, IsNotEmpty } from "class-validator";

export class InviteUserDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
