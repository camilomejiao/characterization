import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

//Dto
import { Update_userDto } from '../../../adapters/input/dto/update_user.dto';

//Entity
import { System_usersEntity } from '../../../../../common/entities/system_users.entity';
import { RoleEntity } from '../../../../../common/entities/role.entity';
import { OrganizationEntity } from '../../../../../common/entities/organization.entity';

//Repository
import { ISystemUserRepository } from '../../output-ports/system_user.repository';
import { IRoleRepository } from '../../../../role/domain/output-ports/role.repository';
import { IOrganizationRepository } from '../../../../organization/domain/output-ports/organization.repository';

export class Update_userUsecase {
  constructor(
    @Inject(ISystemUserRepository)
    private systemUserRepository: ISystemUserRepository,
    @Inject(IRoleRepository)
    private roleRepository: IRoleRepository,
    @Inject(IOrganizationRepository)
    private organizationRepository: IOrganizationRepository,
  ) {}

  public async handler(
    id: number,
    updateUserDto: Update_userDto,
  ): Promise<System_usersEntity> {
    try {
      const user = await this.systemUserRepository.getUser({ id });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      //Validar relaciones
      user.role = await this.getRole(updateUserDto.role_id);

      user.organization = await this.getOrganization(
        updateUserDto.organization_id,
      );

      user.password = await bcrypt.hash(updateUserDto.password, 10);

      const updatedUser: System_usersEntity = {
        ...updateUserDto,
        ...user,
      };
      return await this.systemUserRepository.update(updatedUser);
    } catch (error) {
      console.log(error);
    }
  }

  private async getRole(roleId: number): Promise<RoleEntity> {
    const role = await this.roleRepository.findOneBy({ id: roleId });
    if (!role) throw new Error('Role not found');
    return role;
  }

  private async getOrganization(
    organizationId: number,
  ): Promise<OrganizationEntity> {
    const organization = await this.organizationRepository.findOneBy({
      id: organizationId,
    });

    if (!organization) {
      throw new HttpException('Organization not found', HttpStatus.NOT_FOUND);
    }

    return organization;
  }
}
