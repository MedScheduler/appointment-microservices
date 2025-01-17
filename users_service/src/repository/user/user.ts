import { Injectable } from '@nestjs/common';

import { User, Role } from '../../domain/models';
import { GetUsersFilters } from '../../service/user/types';
import { db } from '../../infra/db/connection/connection';

type RawUser = User & {
  role_id: number;
  description: string;
};

@Injectable()
export class UserRepository {
  private formatUser(user: RawUser) {
    return new User({
      ...user,
      role: {
        id: user.role_id,
        description: user.description,
      },
    });
  }

  createUser(user: User): Promise<User> {
    const { name, email, password, role, createdAt, updatedAt } = user;
    return db('users')
      .first()
      .insert({
        name,
        email,
        password,
        createdAt,
        updatedAt,
        role_id: role.id,
      })
      .then(() => user);
  }

  updateUser(user: User): Promise<User> {
    const { name, email, password, updatedAt } = user;

    return db('users')
      .where({ id: user.id })
      .update({
        name,
        email,
        password,
        updatedAt,
      })
      .then(() => user);
  }

  deleteUser(id: number) {
    return db('users')
      .where({ id })
      .delete()
      .then(() => ({ deleted: true }))
      .catch(() => ({
        deleted: false,
      }));
  }

  async getUserById(id: number): Promise<User> {
    const foundUser = await db('users')
      .select(['users.id', 'name', 'email', 'password', 'roles.description', 'role_id'])
      .where({ 'users.id': id })
      .innerJoin('roles', 'users.role_id', '=', 'roles.id')
      .first();

    if (foundUser) {
      return this.formatUser(foundUser);
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    const foundUser = await db('users')
      .select(['users.id', 'name', 'email', 'password', 'roles.description'])
      .where({ 'users.email': email })
      .innerJoin('roles', 'users.role_id', '=', 'roles.id')
      .first();

    if (foundUser) {
      return this.formatUser(foundUser);
    }
  }

  async getDuplicatedUser(email: string, role: Role): Promise<boolean> {
    const foundUser = await db('users')
      .select(['users.id'])
      .where({ email, role_id: role.id })
      .innerJoin('roles', 'users.role_id', '=', 'roles.id')
      .first();

    return foundUser?.id ? true : false;
  }

  async getUsers(filters: GetUsersFilters): Promise<User[]> {
    const query = db('users')
      .select(['users.id', 'name', 'email', 'password', 'roles.description'])
      .innerJoin('roles', 'users.role_id', '=', 'roles.id');

    if (filters.role) {
      query.where({ 'roles.description': filters.role });
    }

    if (filters.ids?.length > 0) {
      if (filters.ids.length === 1) {
        query.where({ 'users.id': filters.ids[0] });
      } else {
        query.whereIn('users.id', filters.ids);
      }
    }

    const foundUsers = await query;
    return foundUsers.reduce(
      (acc, curr) => acc.concat(this.formatUser(curr)),
      [],
    );
  }
}
