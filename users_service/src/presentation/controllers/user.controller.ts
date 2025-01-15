import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from '../../service/user/user';
import {
  CreateUserParams,
  GetUsersFilters,
  UpdateUserParams,
} from '../../service/user/types';
import { ApiBody, ApiQuery } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBody({
    schema: {
      properties: {
        name: { type: 'string', default: 'Fulano da Silva' },
        email: { type: 'string', default: 'email@example.com' },
        password: { type: 'string', default: '12345' },
        role: { type: 'string', enum: ['doctor', 'patient', 'admin'] },
      },
    },
  })
  createUser(@Body() createUserParams: CreateUserParams) {
    return this.userService.createUser(createUserParams);
  }

  @Put()
  @ApiBody({
    schema: {
      properties: {
        id: { type: 'number', default: 2 },
        name: { type: 'string', default: 'Fulano2 da Silva2' },
        email: { type: 'string', default: 'email@example1.com' },
      },
    },
  })
  updateUser(@Body() updateUserParams: UpdateUserParams) {
    return this.userService.updateUser(updateUserParams);
  }

  @Get()
  @ApiQuery({
    name: 'role',
    required: false,
  })
  getUsers(@Query() filters: GetUsersFilters) {
    return this.userService.getUsers(filters);
  }

  @Get(':id')
  getUser(@Param('id') id: number) {
    return this.userService.getUser(id);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
