import {
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

//Entity
import { System_usersEntity } from '../../../../../common/entities/system_users.entity';
import { RoleEntity } from '../../../../../common/entities/role.entity';
import { OrganizationEntity } from '../../../../../common/entities/organization.entity';

//Dto
import { Create_userDto } from '../../../adapters/input/dto/create_user.dto';

//Interfaces
import { ISystemUserRepository } from '../../output-ports/system_user.repository';
import { IRoleRepository } from '../../../../role/domain/output-ports/role.repository';
import { IOrganizationRepository } from '../../../../organization/domain/output-ports/organization.repository';

export class Create_userUsecase {
  constructor(
    @Inject(ISystemUserRepository)
    private systemUserRepository: ISystemUserRepository,
    @Inject(IRoleRepository)
    private roleRepository: IRoleRepository,
    @Inject(IOrganizationRepository)
    private organizationRepository: IOrganizationRepository,
  ) {}

  public async handler(
    systemUserDto: Create_userDto,
  ): Promise<System_usersEntity> {
    try {
      //Validar relaciones
      const role = await this.getRole(systemUserDto.role_id);
      const organization = await this.getOrganization(
        systemUserDto.organization_id,
      );

      await this.existUser(systemUserDto.email);

      const user = new System_usersEntity({
        name: systemUserDto.name,
        email: systemUserDto.email,
        password: await bcrypt.hash(systemUserDto.password, 10),
        organization,
        active: systemUserDto.active,
        role,
      });
      return await this.systemUserRepository.create(user);
    } catch (error) {
      throw error;
    }
  }

  private async existUser(email) {
    const existingUser = await this.systemUserRepository.findOneBy({
      email: email,
    });
    if (existingUser) {
      throw new ConflictException(`User with email ${email} already exists`);
    }
  }

  private async getRole(roleId: number): Promise<RoleEntity> {
    const role = await this.roleRepository.findOneBy({ id: roleId });
    if (!role) throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
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
