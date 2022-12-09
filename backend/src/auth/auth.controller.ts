import { Controller, Post, Body } from '@nestjs/common';
import { RegisterDTO } from '@shared/dto/RegisterDTO';
@Controller('auth')
export class AuthController {
  @Post('/signup')
  async signUp(@Body() payload: RegisterDTO) {}
}
