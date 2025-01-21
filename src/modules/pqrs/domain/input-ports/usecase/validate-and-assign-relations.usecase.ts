import { Inject } from '@nestjs/common';

//Entity
import { PqrsEntity } from '../../../../../common/entities/pqrs.entity';

//Repository
import { IAffiliateRepository } from '../../../../affiliates/domain/output-ports/affiliate.repository';
import { IMunicipalityRepository } from '../../../../department-municipality/domain/output-ports/municipality.repository';
import { IDepartmentRepository } from '../../../../department-municipality/domain/output-ports/department.repository';
import { IApplicationStatusRepository } from '../../../../common/domain/output-ports/application-status.repository';
import { IPqrsTypeRepository } from '../../../../common/domain/output-ports/pqrs-type.repository';

export class ValidateAndAssignRelationsUsecase {
  constructor(
    @Inject(IPqrsTypeRepository)
    private readonly pqrsTypeRepository: IPqrsTypeRepository,
    @Inject(IApplicationStatusRepository)
    private readonly applicationStatusRepository: IApplicationStatusRepository,
    @Inject(IDepartmentRepository)
    private readonly departmentRepository: IDepartmentRepository,
    @Inject(IMunicipalityRepository)
    private readonly municipalityRepository: IMunicipalityRepository,
    @Inject(IAffiliateRepository)
    private readonly affiliateRepository: IAffiliateRepository,
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

  private async getUser(userId: number) {
    return this.validateEntity(this.affiliateRepository, userId, 'User');
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
