import { Inject } from '@nestjs/common';

//Entity
import { PqrsEntity } from '../../../../../common/entities/pqrs.entity';

//Repository
import { IMunicipalityRepository } from '../../../../department-municipality/domain/output-ports/municipality.repository';
import { IDepartmentRepository } from '../../../../department-municipality/domain/output-ports/department.repository';
import { IApplicationStatusRepository } from '../../../../common/domain/output-ports/application_status.repository';
import { IPqrsTypeRepository } from '../../../../common/domain/output-ports/pqrs_type.repository';
import { IUserRepository } from '../../../../users/domain/output-ports/user.repository';
import { IReasonPqrsRepository } from '../../../../common/domain/output-ports/reason_pqrs.repository';
import { IEpsRepository } from '../../../../common/domain/output-ports/eps.repository';

export class Validate_and_assign_relationsUsecase {
  constructor(
    @Inject(IPqrsTypeRepository)
    private readonly pqrsTypeRepository: IPqrsTypeRepository,
    @Inject(IApplicationStatusRepository)
    private readonly applicationStatusRepository: IApplicationStatusRepository,
    @Inject(IDepartmentRepository)
    private readonly departmentRepository: IDepartmentRepository,
    @Inject(IMunicipalityRepository)
    private readonly municipalityRepository: IMunicipalityRepository,
    @Inject(IReasonPqrsRepository)
    private readonly reasonPqrsRepository: IReasonPqrsRepository,
    @Inject(IEpsRepository)
    private readonly epsRepository: IEpsRepository,
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  public async handler(dto: any, pqrs: PqrsEntity): Promise<PqrsEntity> {
    if (dto.pqrsTypeId) {
      pqrs.pqrsType = await this.getPqrsType(dto.pqrsTypeId);
    }

    if (dto.applicationStatusId) {
      pqrs.applicationStatus = await this.getApplicationStatus(
        dto.applicationStatusId,
      );
    }

    if (dto.departmentId) {
      pqrs.department = await this.getDepartment(dto.departmentId);
    }

    if (dto.municipalityId) {
      pqrs.municipality = await this.getMunicipality(dto.municipalityId);
    }

    if (dto.reasonId) {
      pqrs.reason = await this.getReason(dto.reasonId);
    }

    if (dto.epsId) {
      pqrs.eps = await this.getEps(dto.epsId);
    }

    if (dto.userId) {
      pqrs.user = await this.getUser(dto.userId);
    }

    return pqrs;
  }

  private async getPqrsType(pqrsTypeId: number) {
    return this.validateEntity(
      this.pqrsTypeRepository,
      pqrsTypeId,
      'PQRS Type',
    );
  }

  private async getApplicationStatus(applicationStatusId: number) {
    return this.validateEntity(
      this.applicationStatusRepository,
      applicationStatusId,
      'Application Status',
    );
  }

  private async getDepartment(departmentId: number) {
    return this.validateEntity(
      this.departmentRepository,
      departmentId,
      'Department',
    );
  }

  private async getMunicipality(municipalityId: number) {
    return this.validateEntity(
      this.municipalityRepository,
      municipalityId,
      'Municipality',
    );
  }

  private async getReason(reasonId: number) {
    return this.validateEntity(this.reasonPqrsRepository, reasonId, 'Reason');
  }

  private async getEps(epsId: number) {
    return this.validateEntity(this.epsRepository, epsId, 'Eps');
  }

  private async getUser(userId: number) {
    return this.validateEntity(this.userRepository, userId, 'User');
  }

  private async validateEntity(
    repository: any,
    id: number,
    entityName: string,
  ) {
    const entity = await repository.findOneBy({ id });
    if (!entity) {
      throw new Error(`${entityName} with ID ${id} not found`);
    }
    return entity;
  }
}
