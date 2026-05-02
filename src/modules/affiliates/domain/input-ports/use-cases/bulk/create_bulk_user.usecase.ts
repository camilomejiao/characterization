import { BadRequestException, Inject } from '@nestjs/common';
import { EntityManager } from 'typeorm';

// Entities
import { UserEntity } from '../../../../../../common/entities/user.entity';
import { OrganizationEntity } from '../../../../../../common/entities/organization.entity';

// DTO
import { BulkAffiliateRowDto } from '../../../../adapters/input/dto/dataBulk.dto';

// Repositories
import { ICountryRepository } from '../../../../../common/domain/output-ports/country.repository';
import { IDepartmentRepository } from '../../../../../department-municipality/domain/output-ports/department.repository';
import { IMunicipalityRepository } from '../../../../../department-municipality/domain/output-ports/municipality.repository';
import { IAreaRepository } from '../../../../../common/domain/output-ports/area.repository';
import { ISexRepository } from '../../../../../common/domain/output-ports/sex.repository';
import { IIdentificationTypeRepository } from '../../../../../common/domain/output-ports/identification_type.repository';

export class CreateBulkUserUsecase {
  constructor(
    @Inject(ICountryRepository)
    private readonly countryRepository: ICountryRepository,
    @Inject(IDepartmentRepository)
    private readonly departmentRepository: IDepartmentRepository,
    @Inject(IMunicipalityRepository)
    private readonly municipalityRepository: IMunicipalityRepository,
    @Inject(IAreaRepository)
    private readonly areaRepository: IAreaRepository,
    @Inject(ISexRepository)
    private readonly sexRepository: ISexRepository,
    @Inject(IIdentificationTypeRepository)
    private readonly identificationTypeRepository: IIdentificationTypeRepository,
  ) {}

  public async handler(
    manager: EntityManager,
    row: BulkAffiliateRowDto,
    organizationId: number,
  ): Promise<UserEntity> {
    // Campos obligatorios según BD
    this.validateRequiredValue(
      row.identificationNumber,
      'Número de identificación',
    );
    this.validateRequiredValue(row.firstName, 'Primer nombre');
    this.validateRequiredValue(row.firstLastName, 'Primer apellido');
    this.validateRequiredValue(row.birthdate, 'Fecha de nacimiento');

    const identificationType = await this.validateRequiredEntity(
      row.identificationType,
      this.identificationTypeRepository,
      'acronym',
      'Tipo de identificación',
    );

    /**
     * OPCIONALES EN BD:
     * Si vienen vacíos, se guardan como NULL.
     * Si vienen con valor, se valida que existan.
     */
    const country = await this.validateOptionalEntity(
      row.countryCod,
      this.countryRepository,
      'alpha_code',
      'País',
    );

    const department = await this.validateOptionalEntity(
      row.departmentCode,
      this.departmentRepository,
      'code',
      'Departamento',
    );

    const municipality = await this.validateOptionalEntity(
      row.municipalityCode,
      this.municipalityRepository,
      'code',
      'Municipio',
    );

    const area = await this.validateOptionalEntity(
      row.area,
      this.areaRepository,
      'code',
      'Área',
    );

    const sex = await this.validateOptionalEntity(
      row.sex,
      this.sexRepository,
      'code',
      'Sexo',
    );

    const user = manager.create(UserEntity, {
      firstName: row.firstName,
      middleName: this.cleanValue(row.middleName),
      firstLastName: row.firstLastName,
      middleLastName: this.cleanValue(row.middleLastName),
      identificationNumber: row.identificationNumber,
      birthdate: row.birthdate,
      email: this.cleanValue(row.email),
      phoneNumber: this.cleanValue(row.phoneNumber),
      neighborhood: this.cleanValue(row.neighborhood),
      address: this.cleanValue(row.address),
      organization: { id: organizationId } as OrganizationEntity,
      identificationType,
      country,
      department,
      municipality,
      area,
      sex,
      disabilityType: { id: 1 },
      ethnicity: { id: 1 },
    });

    return await manager.save(UserEntity, user);
  }

  private validateRequiredValue(value: any, fieldName: string): void {
    if (this.isEmpty(value)) {
      throw new BadRequestException(`${fieldName} es obligatorio`);
    }
  }

  private async validateRequiredEntity(
    value: string | number | undefined | null,
    repository: any,
    field: string,
    entityName: string,
  ): Promise<any> {
    if (this.isEmpty(value)) {
      throw new BadRequestException(`${entityName} es obligatorio`);
    }

    return this.findEntityOrFail(value!, repository, field, entityName);
  }

  private async validateOptionalEntity(
    value: string | number | undefined | null,
    repository: any,
    field: string,
    entityName: string,
  ): Promise<any | null> {
    if (this.isEmpty(value)) {
      return null;
    }

    return this.findEntityOrFail(value!, repository, field, entityName);
  }

  private async findEntityOrFail(
    value: string | number,
    repository: any,
    field: string,
    entityName: string,
  ): Promise<any> {
    const entity =
      typeof value === 'number' || /^\d+$/.test(String(value))
        ? await repository.findOneBy({ id: Number(value) })
        : await repository.findOneBy({ [field]: String(value).trim() });

    if (!entity) {
      throw new BadRequestException(
        `${entityName} con valor "${value}" no existe en base de datos`,
      );
    }

    return entity;
  }

  private isEmpty(value: any): boolean {
    return (
      value === undefined ||
      value === null ||
      (typeof value === 'string' && value.trim() === '')
    );
  }

  private cleanValue(value: any): any {
    if (this.isEmpty(value)) return null;

    if (typeof value === 'string') {
      return value.trim();
    }

    return value;
  }
}
