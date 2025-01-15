import { Injectable } from '@nestjs/common';
import { Role } from '../../domain/models';
import { db } from '../../infra/db/connection/connection';

@Injectable()
export class RoleRepository {
  getRoleByDescription(role: string): Promise<Role> {
    return db('roles')
      .where({ description: role })
      .first()
      .then((role) => new Role(role));
  }
}
