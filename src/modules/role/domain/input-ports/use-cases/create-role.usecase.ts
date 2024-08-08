import { Attributes } from '../../../adapters/input/dto/role.dto';
import { IRoleRepository } from '../../output-ports/role.repository';
import { Inject } from '@nestjs/common';
import { Role } from '../../../../../common/entities/role.entity';

export class CreateRoleUseCase {
  constructor(
    @Inject(IRoleRepository)
    private roleRepository: IRoleRepository,
  ) {}

  public async handler(roleDto: Attributes): Promise<Role> {
    try {
      const role = new Role({
        name: roleDto.name,
        is_active: roleDto.is_active,
      });
      return await this.roleRepository.create(role);
    } catch (error) {
      throw error;
    }
  }
}
