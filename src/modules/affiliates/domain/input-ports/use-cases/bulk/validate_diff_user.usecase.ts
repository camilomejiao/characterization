import { Inject } from '@nestjs/common';
//Entity
import { UserEntity } from '../../../../../../common/entities/user.entity';
//Dto
import { BulkAffiliateRowDto } from '../../../../adapters/input/dto/dataBulk.dto';
//Interfaces
import { ICountryRepository } from '../../../../../common/domain/output-ports/country.repository';
import { IAreaRepository } from '../../../../../common/domain/output-ports/area.repository';
import { IDepartmentRepository } from '../../../../../department-municipality/domain/output-ports/department.repository';
import { IMunicipalityRepository } from '../../../../../department-municipality/domain/output-ports/municipality.repository';
import { ISexRepository } from '../../../../../common/domain/output-ports/sex.repository';

export class ValidateDiffUserUsecase {
  constructor(
    @Inject(ICountryRepository)
    private readonly countryRepository: ICountryRepository,
    @Inject(IAreaRepository)
    private readonly areaRepository: IAreaRepository,
    @Inject(IDepartmentRepository)
    private readonly departmentRepository: IDepartmentRepository,
    @Inject(IMunicipalityRepository)
    private readonly municipalityRepository: IMunicipalityRepository,
    @Inject(ISexRepository)
    private readonly sexRepository: ISexRepository,
  ) {}

  public async handler(
    current: UserEntity,
    row: BulkAffiliateRowDto,
  ): Promise<Partial<UserEntity>> {
    try {
      const patch: Partial<UserEntity> = {};

      if (this.notEmpty(row.firstName) && row.firstName !== current.firstName) {
        patch.firstName = row.firstName!;
      }

      if (
        this.notEmpty(row.middleName) &&
        row.middleName !== current.middleName
      ) {
        patch.middleName = row.middleName!;
      }

      if (
        this.notEmpty(row.firstLastName) &&
        row.firstLastName !== current.firstLastName
      ) {
        patch.firstLastName = row.firstLastName!;
      }

      if (
        this.notEmpty(row.middleLastName) &&
        row.middleLastName !== current.middleLastName
      ) {
        patch.middleLastName = row.middleLastName!;
      }

      if (this.notEmpty(row.birthdate) && row.birthdate !== current.birthdate) {
        patch.birthdate = row.birthdate!;
      }

      if (this.notEmpty(row.email) && row.email !== current.email) {
        patch.email = row.email!;
      }

      if (
        this.notEmpty(row.phoneNumber) &&
        row.phoneNumber !== current.phoneNumber
      ) {
        patch.phoneNumber = row.phoneNumber!;
      }

      if (
        this.notEmpty(row.neighborhood) &&
        row.neighborhood !== current.neighborhood
      ) {
        patch.neighborhood = row.neighborhood!;
      }

      if (this.notEmpty(row.address) && row.address !== current.address) {
        patch.address = row.address!;
      }

      // Country -> COD (COL)
      if (row.countryCod && current.country?.alpha_code !== row.countryCod) {
        patch.country = await this.validateFieldOrIdEntity(
          row.countryCod,
          this.countryRepository,
          'alpha_code',
          'Pais',
        );
      }

      // Department -> COD (25)
      if (
        row.departmentCode &&
        current.department?.code !== row.departmentCode
      ) {
        patch.department = await this.validateFieldOrIdEntity(
          row.departmentCode,
          this.departmentRepository,
          'code',
          'Departamento',
        );
      }

      // Municipality -> COD (25572)
      if (
        row.municipalityCode &&
        current.municipality?.code !== row.municipalityCode
      ) {
        patch.municipality = await this.validateFieldOrIdEntity(
          row.municipalityCode,
          this.municipalityRepository,
          'code',
          'Municipio',
        );
      }

      // Area -> COD (U, R)
      if (row.area && current.area?.code !== row.area) {
        patch.area = await this.validateFieldOrIdEntity(
          row.area,
          this.areaRepository,
          'code',
          'Area',
        );
      }

      // Sex -> COD (F, M)
      if (row.sex && current.sex?.code !== row.sex) {
        patch.sex = await this.validateFieldOrIdEntity(
          row.sex,
          this.sexRepository,
          'code',
          'Sexo',
        );
      }

      return patch;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  private notEmpty = (v: any) =>
    v !== undefined &&
    v !== null &&
    !(typeof v === 'string' && v.trim() === '');

  private async validateFieldOrIdEntity(
    value: string | number,
    repository: any,
    field: string,
    entityName: string,
  ): Promise<any> {
    let entity = null;

    if (typeof value === 'number' || /^\d+$/.test(String(value))) {
      entity = await repository.findOneBy({ id: Number(value) });
    } else {
      entity = await repository.findOneBy({ [field]: value });
    }

    if (!entity) {
      throw new Error(`${entityName} with ${field} "${value}" not found`);
    }

    return entity;
  }
}
