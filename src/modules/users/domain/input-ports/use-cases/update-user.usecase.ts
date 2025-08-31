import { Inject, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from '../../../adapters/input/dto/update-user.dto';
import { IUserRepository } from '../../output-ports/user.repository';
import { UserEntity } from '../../../../../common/entities/user.entity';
import { ICountryRepository } from '../../../../common/domain/output-ports/country.repository';
import { IDepartmentRepository } from '../../../../department-municipality/domain/output-ports/department.repository';
import { IMunicipalityRepository } from '../../../../department-municipality/domain/output-ports/municipality.repository';
import { IDisabilityTypeRepository } from '../../../../common/domain/output-ports/disability-type.repository';
import { IGenderRepository } from '../../../../common/domain/output-ports/gender.repository';
import { IAreaRepository } from '../../../../common/domain/output-ports/area.repository';
import { IIdentificationTypeRepository } from '../../../../common/domain/output-ports/identification-type.repository';

export class UpdateUserUsecase {
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

  public async handler(
    id: number,
    userDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: id });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    console.log('user:', user);

    // Validar y obtener nuevas relaciones si se envían en el DTO
    const country = userDto.country_id
      ? await this.getCountry(userDto.country_id)
      : user.country;
    const department = userDto.department_id
      ? await this.getDepartment(userDto.department_id)
      : user.department;
    const municipality = userDto.municipality_id
      ? await this.getMunicipality(userDto.municipality_id)
      : user.municipality;
    const identificationType = userDto.identification_type_id
      ? await this.getIdentificationType(userDto.identification_type_id)
      : user.identificationType;
    const disabilityType = userDto.disability_type_id
      ? await this.getDisabilityType(userDto.disability_type_id)
      : user.disabilityType;
    const gender = userDto.gender_id
      ? await this.getGender(userDto.gender_id)
      : user.gender;
    const area = userDto.area_id
      ? await this.getArea(userDto.area_id)
      : user.area;

    // Construir el nuevo objeto de usuario con solo los datos modificados
    const updatedUser = new UserEntity({
      id: user.id,
      firstName: userDto.first_name ?? user.firstName,
      middleName: userDto.middle_name ?? user.middleName,
      firstLastName: userDto.first_last_name ?? user.firstLastName,
      middleLastName: userDto.middle_last_name ?? user.middleLastName,
      identificationNumber:
        userDto.identification_number ?? user.identificationNumber,
      birthdate: userDto.birthdate ?? user.birthdate,
      email: userDto.email ?? user.email,
      phoneNumber: userDto.phone_number ?? user.phoneNumber,
      neighborhood: userDto.neighborhood ?? user.neighborhood,
      address: userDto.address ?? user.address,
      country,
      department,
      municipality,
      identificationType,
      disabilityType,
      gender,
      area,
    });

    return await this.userRepository.update(id, updatedUser);
  }

  private async getDepartment(departmentId: number) {
    const department = await this.departmentRepository.findOneBy({
      id: departmentId,
    });
    if (!department)
      throw new NotFoundException(
        `Department with ID ${departmentId} not found`,
      );
    return department;
  }

  private async getMunicipality(municipalityId: number) {
    const municipality = await this.municipalityRepository.findOneBy({
      id: municipalityId,
    });
    if (!municipality)
      throw new NotFoundException(
        `Municipality with ID ${municipalityId} not found`,
      );
    return municipality;
  }

  private async getIdentificationType(identificationTypeId: number) {
    const identificationType =
      await this.identificationTypeRepository.findOneBy({
        id: identificationTypeId,
      });
    if (!identificationType)
      throw new NotFoundException(
        `Identification Type with ID ${identificationTypeId} not found`,
      );
    return identificationType;
  }

  private async getDisabilityType(disabilityTypeId: number) {
    const disabilityType = await this.disabilityTypeRepository.findOneBy({
      id: disabilityTypeId,
    });
    if (!disabilityType)
      throw new NotFoundException(
        `Disability Type with ID ${disabilityTypeId} not found`,
      );
    return disabilityType;
  }

  private async getGender(genderId: number) {
    const gender = await this.genderRepository.findOneBy({ id: genderId });
    if (!gender)
      throw new NotFoundException(`Gender with ID ${genderId} not found`);
    return gender;
  }

  private async getArea(areaId: number) {
    const area = await this.areaRepository.findOneBy({ id: areaId });
    if (!area) throw new NotFoundException(`Area with ID ${areaId} not found`);
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
