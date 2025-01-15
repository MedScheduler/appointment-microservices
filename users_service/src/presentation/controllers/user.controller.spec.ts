import { Test, TestingModule } from '@nestjs/testing';

import { UserService } from '../../service/user/user';
import {
  CreateUserParams,
  GetUsersFilters,
  UpdateUserParams,
} from '../../service/user/types';
import User from '../../domain/models/user';

import { UserController } from './user.controller';
import { UserRepository } from '../../repository/user/user';
import { RoleService } from '../../service/role/role';
import { mockedUser } from '../../domain/__mocks__/user-mock';
import { RoleRepository } from '../../repository';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, UserRepository, RoleService, RoleRepository],
    }).compile();

    userController = app.get<UserController>(UserController);
    userService = app.get<UserService>(UserService);
  });

  it('should call create user correctly', () => {
    const userData: CreateUserParams = {
      name: 'mocked-user',
      email: 'mocked-user@gmail.com',
      password: 'mocked-password',
      role: 'admin',
    };

    const result = new User({
      ...userData,
      role: { id: 1, description: 'admin' },
    });

    jest.spyOn(userService, 'createUser').mockResolvedValueOnce({
      data: result,
    });

    expect(userController.createUser(userData)).resolves.toStrictEqual({
      data: result,
    });
  });

  it('should call update user correctly', () => {
    const userData: UpdateUserParams = {
      id: 1,
      name: 'mocked-user',
      email: 'mocked-user@gmail.com',
      password: 'mocked-password',
    };

    const result = new User({
      ...userData,
      role: { id: 1, description: 'admin' },
    });

    jest.spyOn(userService, 'updateUser').mockResolvedValueOnce({
      data: result,
    });

    expect(userController.updateUser(userData)).resolves.toStrictEqual({
      data: result,
    });
  });

  it('should call get users correctly', () => {
    const queryParams: GetUsersFilters = {
      role: 'admin',
    };

    jest.spyOn(userService, 'getUsers').mockResolvedValueOnce({
      data: [mockedUser],
    });

    expect(userController.getUsers(queryParams)).resolves.toStrictEqual({
      data: [mockedUser],
    });
    expect(userService.getUsers).toHaveBeenCalledWith(queryParams);
  });

  it('should call get user correctly', () => {
    const userId = 1;
    jest.spyOn(userService, 'getUser').mockResolvedValueOnce({
      data: mockedUser,
    });

    expect(userController.getUser(userId)).resolves.toStrictEqual({
      data: mockedUser,
    });
    expect(userService.getUser).toHaveBeenCalledWith(userId);
  });

  it('should call delete user correctly', () => {
    const userId = 1;
    jest.spyOn(userService, 'deleteUser').mockResolvedValueOnce({
      data: { success: true },
    });

    expect(userController.deleteUser(userId)).resolves.toStrictEqual({
      data: { success: true },
    });
    expect(userService.deleteUser).toHaveBeenCalledWith(userId);
  });
});
