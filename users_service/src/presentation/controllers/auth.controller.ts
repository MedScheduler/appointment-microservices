import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../../service/auth/auth';
import { ApiBody } from '@nestjs/swagger';
import { AuthParams } from '../../service/auth/types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiBody({
    schema: {
      properties: {
        email: { type: 'string', default: 'email@example.com' },
        password: { type: 'string', default: '12345' },
      },
    },
  })
  async createUser(@Body() params: AuthParams) {
    const loggedUser = await this.authService.login(params);

    if (!loggedUser || loggedUser?.error) {
      throw new UnauthorizedException(loggedUser?.error);
    }

    return loggedUser;
  }
}
