import {
  HttpException,
  HttpStatus,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

//Dto
import { UpdateUserDto } from '../../../adapters/input/dto/update-user.dto';

//Entity
import { SystemUsersEntity } from '../../../../../common/entities/system-users.entity';
import { DepartmentEntity } from '../../../../../common/entities/department.entity';
import { MunicipalityEntity } from '../../../../../common/entities/municipality.entity';
import { RoleEntity } from '../../../../../common/entities/role.entity';

//Repository
import { ISystemUserRepository } from '../../output-ports/system-user.repository';
import { IDepartmentRepository } from '../../../../department-municipality/domain/output-ports/department.repository';
import { IMunicipalityRepository } from '../../../../department-municipality/domain/output-ports/municipality.repository';
import { IRoleRepository } from '../../../../role/domain/output-ports/role.repository';

export class UpdateUserUsecase {
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
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<SystemUsersEntity> {
    const user = await this.systemUserRepository.getUser({ id });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    //Validar relaciones
    user.role = await this.getRole(updateUserDto.role_id);
    user.department = await this.getDepartment(updateUserDto.department_id);
    user.municipality = await this.getMunicipality(
      updateUserDto.municipality_id,
    );
    user.password = await bcrypt.hash(updateUserDto.password, 10);

    const updatedUser: SystemUsersEntity = {
      ...updateUserDto,
      ...user,
    };
    return await this.systemUserRepository.update(updatedUser);
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
      throw new NotFoundException(
        `Department with ID ${departmentId} not found`,
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
      throw new NotFoundException(
        `Municipality with ID ${municipalityId} not found`,
      );
    }
    return municipality;
  }
}
