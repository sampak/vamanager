import { Controller, Post, Body } from '@nestjs/common';
import { RegisterDTO } from '@shared/dto/RegisterDTO';
import { AuthService } from './auth.service';
import { LoginDTO } from '@shared/dto/LoginDTO';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  async signIn(@Body() payload: LoginDTO): Promise<string> {
    return await this.authService.signIn(payload);
  }

  @Post('/signup')
  async signUp(@Body() payload: RegisterDTO): Promise<string> {
    return await this.authService.signUp(payload);
  }
}
