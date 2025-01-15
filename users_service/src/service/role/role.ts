import { Injectable } from '@nestjs/common';

import { RoleRepository } from '../../repository/';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async getRoleByDescription(role: string) {
    const foundRole = await this.roleRepository.getRoleByDescription(role);

    if (!foundRole) {
      return { error: 'role does not exist' };
    }

    return { data: foundRole };
  }
}
