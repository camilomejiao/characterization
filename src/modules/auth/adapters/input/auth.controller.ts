import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../../domain/input-ports/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.signIn(body.email, body.password);
  }

  @Get('private')
  @UseGuards(AuthGuard('jwt')) // Ruta protegida
  testPrivateRoute() {
    return { message: 'Private route accessed' };
  }
}
