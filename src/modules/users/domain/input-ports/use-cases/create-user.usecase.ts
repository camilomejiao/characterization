import {
  HttpException,
  HttpStatus,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '../../../adapters/input/dto/create-user.dto';
import { IUserRepository } from '../../output-ports/user.repository';
import { UserEntity } from '../../../../../common/entities/user.entity';
import { IDepartmentRepository } from '../../../../department-municipality/domain/output-ports/department.repository';
import { IMunicipalityRepository } from '../../../../department-municipality/domain/output-ports/municipality.repository';
import { IDisabilityTypeRepository } from '../../../../common/domain/output-ports/disability-type.repository';
import { IGenderRepository } from '../../../../common/domain/output-ports/gender.repository';
import { IAreaRepository } from '../../../../common/domain/output-ports/area.repository';
import { DepartmentEntity } from '../../../../../common/entities/department.entity';
import { MunicipalityEntity } from '../../../../../common/entities/municipality.entity';
import { IIdentificationTypeRepository } from '../../../../common/domain/output-ports/identification-type.repository';
import { ICountryRepository } from '../../../../common/domain/output-ports/country.repository';

export class CreateUserUsecase {
  constructor(
    @Inject(IUserRepository)
    private userRepository: IUserRepository,
    @Inject(ICountryRepository)
    private countryRepository: ICountryRepository,
    @Inject(IDepartmentRepository)
    private departmentRepository: IDepartmentRepository,
    @Inject(IMunicipalityRepository)
    private municipalityRepository: IMunicipalityRepository,
    @Inject(IIdentificationTypeRepository)
    private identificationTypeRepository: IIdentificationTypeRepository,
    @Inject(IDisabilityTypeRepository)
    private disabilityTypeRepository: IDisabilityTypeRepository,
    @Inject(IGenderRepository)
    private genderRepository: IGenderRepository,
    @Inject(IAreaRepository)
    private areaRepository: IAreaRepository,
  ) {}

  public async handler(userDto: CreateUserDto): Promise<UserEntity> {
    try {
      const country = await this.getCountry(userDto.country_id);
      const department = await this.getDepartment(userDto.department_id);
      const municipality = await this.getMunicipality(userDto.municipality_id);
      const identificationType = await this.getIdentificationType(
        userDto.identification_type_id,
      );
      const disabilityType = await this.getDisabilityType(
        userDto.disability_type_id,
      );
      const gender = await this.getGender(userDto.gender_id);
      const area = await this.getArea(userDto.area_id);

      const user = new UserEntity({
        firstName: userDto.first_name,
        middleName: userDto.middle_name,
        firstLastName: userDto.first_last_name,
        middleLastName: userDto.middle_last_name,
        identificationNumber: userDto.identification_number,
        birthdate: userDto.birthdate,
        email: userDto.email,
        phoneNumber: userDto.phone_number,
        neighborhood: userDto.neighborhood,
        address: userDto.address,
        country,
        department,
        municipality,
        identificationType,
        disabilityType,
        gender,
        area,
      });

      return await this.userRepository.create(user);
    } catch (error) {
      throw error;
    }
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

  private async getIdentificationType(identificationTypeId: number) {
    const identificationType =
      await this.identificationTypeRepository.findOneBy({
        id: identificationTypeId,
      });
    if (!identificationType) {
      throw new NotFoundException(
        `Identification Type with ID ${identificationTypeId} not found`,
      );
    }
    return identificationType;
  }

  private async getDisabilityType(disabilityTypeId: number) {
    const disabilityType = await this.disabilityTypeRepository.findOneBy({
      id: disabilityTypeId,
    });
    if (!disabilityType) {
      throw new NotFoundException(
        `Disability Type with ID ${disabilityTypeId} not found`,
      );
    }
    return disabilityType;
  }

  private async getGender(genderId: number) {
    const gender = await this.genderRepository.findOneBy({ id: genderId });
    if (!gender) {
      throw new NotFoundException(`Gender with ID ${genderId} not found`);
    }
    return gender;
  }

  private async getArea(areaId: number) {
    const area = await this.areaRepository.findOneBy({ id: areaId });
    if (!area) {
      throw new NotFoundException(`Area with ID ${areaId} not found`);
    }
    return area;
  }

  private async getCountry(countryId: number) {
    const department = await this.countryRepository.findOneBy({
      id: countryId,
    });
    if (!department)
      throw new NotFoundException(`Country with ID ${countryId} not found`);
    return department;
  }
}
