import {
  HttpException,
  HttpStatus,
  Inject,
  NotFoundException,
} from '@nestjs/common';
//
import { IOrganizationRepository } from '../../output-ports/organization.repository';
import { IDepartmentRepository } from '../../../../department-municipality/domain/output-ports/department.repository';
import { IMunicipalityRepository } from '../../../../department-municipality/domain/output-ports/municipality.repository';
//Dto
import { Update_organizationDto } from '../../../adapters/inputs/dto/update_organization.dto';
import { OrganizationEntity } from '../../../../../common/entities/organization.entity';
import { DepartmentEntity } from '../../../../../common/entities/department.entity';
import { MunicipalityEntity } from '../../../../../common/entities/municipality.entity';

export class UpdateOrganziationUsecase {
  constructor(
    @Inject(IOrganizationRepository)
    private organizationRepository: IOrganizationRepository,
    @Inject(IDepartmentRepository)
    private departmentRepository: IDepartmentRepository,
    @Inject(IMunicipalityRepository)
    private municipalityRepository: IMunicipalityRepository,
  ) {}

  public async handler(
    id: number,
    UpdateOrganizationDto: Update_organizationDto,
  ): Promise<OrganizationEntity> {
    try {
      //Validar relaciones
      const organization = await this.organizationRepository.getOrganization({
        id,
      });
      if (!organization) {
        throw new HttpException('Organization not found', HttpStatus.NOT_FOUND);
      }

      organization.department = await this.getDepartment(
        UpdateOrganizationDto.department_id,
      );
      organization.municipality = await this.getMunicipality(
        UpdateOrganizationDto.municipality_id,
      );

      const updateOrganziation: OrganizationEntity = {
        ...UpdateOrganizationDto,
        ...organization,
      };

      return await this.organizationRepository.update(updateOrganziation);
    } catch (error) {
      console.log(error);
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
}
