import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LoginDto } from './dto/login-dto';
import { ResponseMessage } from 'src/response-message.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Login successful!')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Get('profile')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Profile successful!')
  async me() {
    return await this.authService.profile();
  }
}
