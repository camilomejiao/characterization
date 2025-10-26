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
import { DepartmentEntity } from '../../../../../common/entities/department.entity';
import { MunicipalityEntity } from '../../../../../common/entities/municipality.entity';

//Dto
import { Create_userDto } from '../../../adapters/input/dto/create_user.dto';

//Interfaces
import { ISystemUserRepository } from '../../output-ports/system_user.repository';
import { IRoleRepository } from '../../../../role/domain/output-ports/role.repository';
import { IDepartmentRepository } from '../../../../department-municipality/domain/output-ports/department.repository';
import { IMunicipalityRepository } from '../../../../department-municipality/domain/output-ports/municipality.repository';

export class Create_userUsecase {
  constructor(
    @Inject(ISystemUserRepository)
    private systemUserRepository: ISystemUserRepository,
    @Inject(IRoleRepository)
    private roleRepository: IRoleRepository,
    @Inject(IDepartmentRepository)
    private departmentRepository: IDepartmentRepository,
    @Inject(IMunicipalityRepository)
    private municipalityRepository: IMunicipalityRepository,
  ) {}

  public async handler(
    systemUserDto: Create_userDto,
  ): Promise<System_usersEntity> {
    try {
      //Validar relaciones
      const role = await this.getRole(systemUserDto.role_id);
      const department = await this.getDepartment(systemUserDto.department_id);
      const municipality = await this.getMunicipality(
        systemUserDto.municipality_id,
      );

      await this.existUser(systemUserDto.email);

      const user = new System_usersEntity({
        name: systemUserDto.name,
        email: systemUserDto.email,
        password: await bcrypt.hash(systemUserDto.password, 10),
        organizationName: systemUserDto?.organization_name,
        active: systemUserDto.active,
        role,
        department,
        municipality,
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
    if (!role) throw new Error('Role not found');
    return role;
  }

  private async getDepartment(departmentId: number): Promise<DepartmentEntity> {
    const department = await this.departmentRepository.findOneBy({
      id: departmentId,
    });
    if (!department) {
      throw new HttpException(
        `Department with ID ${departmentId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return department;
  }

  private async getMunicipality(
    municipalityId: number,
  ): Promise<MunicipalityEntity> {
    const municipality = await this.municipalityRepository.findOneBy({
      id: municipalityId,
    });
    if (!municipality) {
      throw new HttpException(
        `Municipality with ID ${municipalityId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return municipality;
  }
}
