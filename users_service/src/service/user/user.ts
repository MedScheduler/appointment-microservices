import { Injectable } from '@nestjs/common';
import { genSaltSync, hashSync } from 'bcrypt';

import { RoleService } from '../';
import { User, Role } from '../../domain/models';
import { CreateUserParams, GetUsersFilters, UpdateUserParams } from './types';
import { validateEmail } from '../../utils/validate-email';
import { UserRepository } from '../../repository';

@Injectable()
export class UserService {
  constructor(
    private readonly roleService: RoleService,
    private readonly userRepository: UserRepository,
  ) {}
  users: User[] = [];

  async createUser(params: CreateUserParams) {
    const { name, email, password, role: roleParam } = params;

    const role = await this.roleService.getRoleByDescription(roleParam);
    const encryptedPassword = hashSync(password, genSaltSync(10));

    if (role.error) {
      return { error: 'Role not found' };
    }
    if (!validateEmail(email)) {
      return { error: 'Invalid email' };
    }
    if (await this.isUserDuplicated(email, role.data)) {
      return { error: 'Duplicated User' };
    }

    const newUser = new User({
      name,
      email,
      password: encryptedPassword,
      role: role.data,
    });

    return { data: await this.userRepository.createUser(newUser) };
  }

  async updateUser(params: UpdateUserParams) {
    const { id, name, email } = params;

    if (!id) {
      return { error: 'Id is required' };
    }

    const user = await this.getUser(id);

    if (user.error || !user) {
      return { error: 'User not found' };
    }
    if (!validateEmail(email)) {
      return { error: 'Invalid email' };
    }
    if (await this.isUserDuplicated(email, user.data.role)) {
      return { error: 'Email already in use' };
    }

    user.data.id = id;
    user.data.name = name;
    user.data.email = email;
    user.data.updatedAt = new Date();

    return { data: await this.userRepository.updateUser(user.data) };
  }

  async deleteUser(id: number) {
    const result = await this.userRepository.deleteUser(id);

    return { data: { success: result.deleted } };
  }

  async getUsers(filters: GetUsersFilters) {
    try {
      return { data: await this.userRepository.getUsers(filters) };
    } catch {
      return { error: 'Cannot get users' };
    }
  }

  async getUser(id: number) {
    try {
      return { data: await this.userRepository.getUserById(id) };
    } catch {
      return { error: 'Cannot get user' };
    }
  }

  async getUserByEmail(email: string) {
    try {
      return {
        data: await this.userRepository.getUserByEmail(email),
      };
    } catch {
      return { error: 'Cannot get user' };
    }
  }

  isUserDuplicated(email: string, role: Role) {
    return this.userRepository.getDuplicatedUser(email, role);
  }
}
