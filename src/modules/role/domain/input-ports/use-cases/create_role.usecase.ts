import { RoleDto } from '../../../adapters/input/dto/role.dto';
import { IRoleRepository } from '../../output-ports/role.repository';
import { Inject } from '@nestjs/common';
import { RoleEntity } from '../../../../../common/entities/role.entity';

export class Create_roleUsecase {
  constructor(
    @Inject(IRoleRepository)
    private roleRepository: IRoleRepository,
  ) {}

  public async handler(roleDto: RoleDto): Promise<RoleEntity> {
    try {
      const role = new RoleEntity({
        name: roleDto.name,
        description: roleDto.description,
        is_active: roleDto.is_active,
      });
      return await this.roleRepository.create(role);
    } catch (error) {
      throw error;
    }
  }
}
