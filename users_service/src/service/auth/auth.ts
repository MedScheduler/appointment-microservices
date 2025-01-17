import { Injectable } from '@nestjs/common';

import { UserService } from '../';
import { AuthParams } from './types';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async login(params: AuthParams) {
    try {
      const { email, password } = params;
      const user = await this.userService.getUserByEmail(email);

      if (compareSync(password, user?.data?.password)) {
        return { data: user };
      }

      return { error: 'Invalid email or password' };
    } catch {
      return { error: 'Invalid email or password' };
    }
  }
}
