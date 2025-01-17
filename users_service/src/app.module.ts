import { Module } from '@nestjs/common';
import { UserController } from './presentation/controllers/user.controller';
import { AuthController } from './presentation/controllers/auth.controller';
import { UserService, RoleService } from './service';
import { UserRepository } from './repository/user/user';
import { RoleRepository } from './repository';
import { AuthService } from './service/auth/auth';

@Module({
  imports: [],
  controllers: [UserController, AuthController],
  providers: [
    UserService,
    RoleService,
    UserRepository,
    RoleRepository,
    AuthService,
  ],
})
export class AppModule {}
