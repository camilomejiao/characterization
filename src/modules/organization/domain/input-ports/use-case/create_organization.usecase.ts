import { HttpException, HttpStatus, Inject } from '@nestjs/common';

//Dto
import { Create_organizationDto } from '../../../adapters/inputs/dto/create_organization.dto';

//Entity
import { OrganizationEntity } from '../../../../../common/entities/organization.entity';
import { DepartmentEntity } from '../../../../../common/entities/department.entity';
import { MunicipalityEntity } from '../../../../../common/entities/municipality.entity';

//Interface
import { IOrganizationRepository } from '../../output-ports/organization.repository';
import { IDepartmentRepository } from '../../../../department-municipality/domain/output-ports/department.repository';
import { IMunicipalityRepository } from '../../../../department-municipality/domain/output-ports/municipality.repository';

export class Create_organizationUsecase {
  constructor(
    @Inject(IOrganizationRepository)
    private organizationRepository: IOrganizationRepository,
    @Inject(IDepartmentRepository)
    private departmentRepository: IDepartmentRepository,
    @Inject(IMunicipalityRepository)
    private municipalityRepository: IMunicipalityRepository,
  ) {}

  public async handler(
    createOrganizationDto: Create_organizationDto,
    file?: Express.Multer.File | null,
  ): Promise<OrganizationEntity> {
    try {
      //Validar relaciones
      const department = await this.getDepartment(
        createOrganizationDto.department_id,
      );
      const municipality = await this.getMunicipality(
        createOrganizationDto.municipality_id,
      );

      const organization = new OrganizationEntity({
        nit: createOrganizationDto.nit,
        name: createOrganizationDto.name,
        address: createOrganizationDto.address,
        department,
        municipality,
      });

      return await this.organizationRepository.create(organization);
    } catch (error) {
      console.log(error);
      throw error;
    }
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
