import { Module } from '@nestjs/common';
import { UserController } from './presentation/controllers/user.controller';
import { UserService, RoleService } from './service';
import { UserRepository } from './repository/user/user';
import { RoleRepository } from './repository';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, RoleService, UserRepository, RoleRepository],
})
export class AppModule {}
