import { Controller, Post, Body, Get, Param } from '@nestjs/common';
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
  async signUp(
    @Body() payload: RegisterDTO
  ): Promise<{ id: string; key: string }> {
    return await this.authService.signUp(payload);
  }

  @Post('/code')
  async code(@Body() payload: { userId: string }) {
    return await this.authService.code(payload);
  }

  @Get('/resend/:userId')
  async resendCode(@Param('userId') userId: string) {
    return this.authService.resendCode(userId);
  }
}
