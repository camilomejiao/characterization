import { AffiliatesEntity } from '../../../../../common/entities/affiliate.entity';
import { IAffiliateRepository } from '../../output-ports/affiliate.repository';
import { UpdateAffiliateDto } from '../../../adapters/input/dto/update-affiliate.dto';
import { Inject } from '@nestjs/common';
import { IDepartmentRepository } from '../../../../department-municipality/domain/output-ports/department.repository';
import { IMunicipalityRepository } from '../../../../department-municipality/domain/output-ports/municipality.repository';
import { IAffiliateTypeRepository } from '../../../../common/domain/output-ports/affiliate-type.repository';
import { IAreaRepository } from '../../../../common/domain/output-ports/area.repository';
import { ICommunityRepository } from '../../../../common/domain/output-ports/community.repository';
import { IDisabilityTypeRepository } from '../../../../common/domain/output-ports/disability-type.repository';
import { IEpsRepository } from '../../../../common/domain/output-ports/eps.repository';
import { IEthnicityRepository } from '../../../../common/domain/output-ports/ethnicity.repository';
import { IGenderRepository } from '../../../../common/domain/output-ports/gender.repository';
import { IIdentificationTypeRepository } from '../../../../common/domain/output-ports/identification-type.repository';
import { ILevelRepository } from '../../../../common/domain/output-ports/level.repository';
import { IMembershipClassRepository } from '../../../../common/domain/output-ports/membership-class.repository';
import { IMethodologyRepository } from '../../../../common/domain/output-ports/methodology.repository';
import { IPopulationTypeRepository } from '../../../../common/domain/output-ports/population-type.repository';

export class UpdateAffiliateUsecase {
  constructor(
    @Inject(IAffiliateRepository)
    private affiliateRepository: IAffiliateRepository,
    @Inject(IDepartmentRepository)
    private departmentRepository: IDepartmentRepository,
    @Inject(IMunicipalityRepository)
    private municipalityRepository: IMunicipalityRepository,
    @Inject(IAffiliateTypeRepository)
    private affiliateTypeRepository: IAffiliateTypeRepository,
    @Inject(IAreaRepository)
    private areaRepository: IAreaRepository,
    @Inject(ICommunityRepository)
    private communityRepository: ICommunityRepository,
    @Inject(IDisabilityTypeRepository)
    private disabilityTypeRepository: IDisabilityTypeRepository,
    @Inject(IEpsRepository)
    private epsRepository: IEpsRepository,
    @Inject(IEthnicityRepository)
    private ethnicityRepository: IEthnicityRepository,
    @Inject(IGenderRepository)
    private genderRepository: IGenderRepository,
    @Inject(IIdentificationTypeRepository)
    private identificationTypeRepository: IIdentificationTypeRepository,
    @Inject(ILevelRepository)
    private levelRepository: ILevelRepository,
    @Inject(IMembershipClassRepository)
    private membershipClassRepository: IMembershipClassRepository,
    @Inject(IMethodologyRepository)
    private methodologyRepository: IMethodologyRepository,
    @Inject(IPopulationTypeRepository)
    private populationTypeRepository: IPopulationTypeRepository,
  ) {}

  public async handler(
    id: number,
    updateAffiliateDto: UpdateAffiliateDto,
  ): Promise<AffiliatesEntity> {
    // Buscar el afiliado existente
    const affiliate = await this.affiliateRepository.findOneBy({ id });
    if (!affiliate) {
      throw new Error(`Affiliate with ID ${id} not found`);
    }

    // Validar y asignar relaciones solo si están presentes en el DTO
    if (updateAffiliateDto.departmentId !== undefined) {
      affiliate.department = await this.getDepartment(
        updateAffiliateDto.departmentId,
      );
    }
    if (updateAffiliateDto.municipalityId !== undefined) {
      affiliate.municipality = await this.getMunicipality(
        updateAffiliateDto.municipalityId,
      );
    }
    if (updateAffiliateDto.populationTypeId !== undefined) {
      affiliate.populationType = await this.getPopulationType(
        updateAffiliateDto.populationTypeId,
      );
    }
    if (updateAffiliateDto.epsId !== undefined) {
      affiliate.eps = await this.getEps(updateAffiliateDto.epsId);
    }

    if (updateAffiliateDto.affiliateTypeId !== undefined) {
      affiliate.affiliateType = await this.getAffiliateType(
        updateAffiliateDto.affiliateTypeId,
      );
    }

    if (updateAffiliateDto.areaId !== undefined) {
      affiliate.area = await this.getArea(updateAffiliateDto.areaId);
    }
    if (updateAffiliateDto.communityId !== undefined) {
      affiliate.community = await this.getCommunity(
        updateAffiliateDto.communityId,
      );
    }
    if (updateAffiliateDto.disabilityTypeId !== undefined) {
      affiliate.disabilityType = await this.getDisabilityType(
        updateAffiliateDto.disabilityTypeId,
      );
    }
    if (updateAffiliateDto.ethnicityId !== undefined) {
      affiliate.ethnicity = await this.getEthnicity(
        updateAffiliateDto.ethnicityId,
      );
    }
    if (updateAffiliateDto.genderId !== undefined) {
      affiliate.gender = await this.getGender(updateAffiliateDto.genderId);
    }
    if (updateAffiliateDto.identificationTypeId !== undefined) {
      affiliate.identificationType = await this.getIdentificationType(
        updateAffiliateDto.identificationTypeId,
      );
    }
    if (updateAffiliateDto.levelId !== undefined) {
      affiliate.level = await this.getLevel(updateAffiliateDto.levelId);
    }
    if (updateAffiliateDto.membershipClassId !== undefined) {
      affiliate.membershipClass = await this.getMembershipClass(
        updateAffiliateDto.membershipClassId,
      );
    }
    if (updateAffiliateDto.methodologyId !== undefined) {
      affiliate.methodology = await this.getMethodology(
        updateAffiliateDto.methodologyId,
      );
    }

    // Asignar campos directos (sin relaciones)
    if (updateAffiliateDto.firstName !== undefined) {
      affiliate.firstName = updateAffiliateDto.firstName;
    }
    if (updateAffiliateDto.middleName !== undefined) {
      affiliate.middleName = updateAffiliateDto.middleName;
    }
    if (updateAffiliateDto.firstLastName !== undefined) {
      affiliate.firstLastName = updateAffiliateDto.firstLastName;
    }
    if (updateAffiliateDto.middleLastName !== undefined) {
      affiliate.middleLastName = updateAffiliateDto.middleLastName;
    }
    if (updateAffiliateDto.identificationNumber !== undefined) {
      affiliate.identificationNumber = updateAffiliateDto.identificationNumber;
    }
    if (updateAffiliateDto.birthdate !== undefined) {
      affiliate.birthdate = updateAffiliateDto.birthdate;
    }
    if (updateAffiliateDto.email !== undefined) {
      affiliate.email = updateAffiliateDto.email;
    }
    if (updateAffiliateDto.phoneNumber !== undefined) {
      affiliate.phoneNumber = updateAffiliateDto.phoneNumber;
    }

    console.log('Updated affiliate:', affiliate);

    // Guardar los cambios
    return await this.affiliateRepository.update(id, affiliate);
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

  private async getPopulationType(populationTypeId: number) {
    return this.validateEntity(
      this.populationTypeRepository,
      populationTypeId,
      'Population Type',
    );
  }

  private async getEps(epsId: number) {
    return this.validateEntity(this.epsRepository, epsId, 'EPS');
  }

  private async getAffiliateType(affiliateTypeId: number) {
    return this.validateEntity(
      this.affiliateTypeRepository,
      affiliateTypeId,
      'Affiliate Type',
    );
  }

  private async getArea(areaId: number) {
    return this.validateEntity(this.areaRepository, areaId, 'Area');
  }

  private async getCommunity(communityId: number) {
    return this.validateEntity(
      this.communityRepository,
      communityId,
      'Community',
    );
  }

  private async getDisabilityType(disabilityTypeId: number) {
    return this.validateEntity(
      this.disabilityTypeRepository,
      disabilityTypeId,
      'Disability Type',
    );
  }

  private async getEthnicity(ethnicityId: number) {
    return this.validateEntity(
      this.ethnicityRepository,
      ethnicityId,
      'Ethnicity',
    );
  }

  private async getGender(genderId: number) {
    return this.validateEntity(this.genderRepository, genderId, 'Gender');
  }

  private async getIdentificationType(identificationTypeId: number) {
    return this.validateEntity(
      this.identificationTypeRepository,
      identificationTypeId,
      'Identification Type',
    );
  }

  private async getLevel(levelId: number) {
    return this.validateEntity(this.levelRepository, levelId, 'Level');
  }

  private async getMembershipClass(membershipClassId: number) {
    return this.validateEntity(
      this.membershipClassRepository,
      membershipClassId,
      'Membership Class',
    );
  }

  private async getMethodology(methodologyId: number) {
    return this.validateEntity(
      this.methodologyRepository,
      methodologyId,
      'Methodology',
    );
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
