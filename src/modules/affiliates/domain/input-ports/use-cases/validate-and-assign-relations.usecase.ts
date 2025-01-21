import { Inject } from '@nestjs/common';

//Entity
import { AffiliatesEntity } from '../../../../../common/entities/affiliate.entity';

//Repository
import { IDepartmentRepository } from '../../../../department-municipality/domain/output-ports/department.repository';
import { IMunicipalityRepository } from '../../../../department-municipality/domain/output-ports/municipality.repository';
import { IIdentificationTypeRepository } from '../../../../common/domain/output-ports/identification-type.repository';
import { IPopulationTypeRepository } from '../../../../common/domain/output-ports/population-type.repository';
import { IEpsRepository } from '../../../../common/domain/output-ports/eps.repository';
import { IDisabilityTypeRepository } from '../../../../common/domain/output-ports/disability-type.repository';
import { IGenderRepository } from '../../../../common/domain/output-ports/gender.repository';
import { IAffiliateTypeRepository } from '../../../../common/domain/output-ports/affiliate-type.repository';
import { IAreaRepository } from '../../../../common/domain/output-ports/area.repository';
import { IMethodologyRepository } from '../../../../common/domain/output-ports/methodology.repository';
import { ILevelRepository } from '../../../../common/domain/output-ports/level.repository';
import { IMembershipClassRepository } from '../../../../common/domain/output-ports/membership-class.repository';
import { IEthnicityRepository } from '../../../../common/domain/output-ports/ethnicity.repository';
import { ICommunityRepository } from '../../../../common/domain/output-ports/community.repository';
import { IGroupSubgroupRespository } from '../../../../common/domain/output-ports/group-subgroup.respository';

export class ValidateAndAssignRelationsUsecase {
  constructor(
    @Inject(IDepartmentRepository)
    private readonly departmentRepository: IDepartmentRepository,
    @Inject(IMunicipalityRepository)
    private readonly municipalityRepository: IMunicipalityRepository,
    @Inject(IIdentificationTypeRepository)
    private readonly identificationTypeRepository: IIdentificationTypeRepository,
    @Inject(IPopulationTypeRepository)
    private readonly populationTypeRepository: IPopulationTypeRepository,
    @Inject(IEpsRepository)
    private readonly epsRepository: IEpsRepository,
    @Inject(IDisabilityTypeRepository)
    private readonly disabilityTypeRepository: IDisabilityTypeRepository,
    @Inject(IGenderRepository)
    private readonly genderRepository: IGenderRepository,
    @Inject(IAffiliateTypeRepository)
    private readonly affiliateTypeRepository: IAffiliateTypeRepository,
    @Inject(IAreaRepository)
    private readonly areaRepository: IAreaRepository,
    @Inject(IMethodologyRepository)
    private readonly methodologyRepository: IMethodologyRepository,
    @Inject(ILevelRepository)
    private readonly levelRepository: ILevelRepository,
    @Inject(IMembershipClassRepository)
    private readonly membershipClassRepository: IMembershipClassRepository,
    @Inject(IEthnicityRepository)
    private readonly ethnicityRepository: IEthnicityRepository,
    @Inject(ICommunityRepository)
    private readonly communityRepository: ICommunityRepository,
    @Inject(IGroupSubgroupRespository)
    private readonly groupSubgroupRepository: IGroupSubgroupRespository,
  ) {}

  public async handler(
    dto: any,
    affiliate: AffiliatesEntity,
  ): Promise<AffiliatesEntity> {
    // Validar y asignar relaciones
    affiliate.department = dto.departmentId
      ? await this.getDepartment(dto.departmentId)
      : affiliate.department;
    affiliate.municipality = dto.municipalityId
      ? await this.getMunicipality(dto.municipalityId)
      : affiliate.municipality;
    affiliate.populationType = dto.populationTypeId
      ? await this.getPopulationType(dto.populationTypeId)
      : affiliate.populationType;
    affiliate.eps = dto.epsId ? await this.getEps(dto.epsId) : affiliate.eps;
    affiliate.affiliateType = dto.affiliateTypeId
      ? await this.getAffiliateType(dto.affiliateTypeId)
      : affiliate.affiliateType;
    affiliate.area = dto.areaId
      ? await this.getArea(dto.areaId)
      : affiliate.area;
    affiliate.community = dto.communityId
      ? await this.getCommunity(dto.communityId)
      : affiliate.community;
    affiliate.disabilityType = dto.disabilityTypeId
      ? await this.getDisabilityType(dto.disabilityTypeId)
      : affiliate.disabilityType;
    affiliate.ethnicity = dto.ethnicityId
      ? await this.getEthnicity(dto.ethnicityId)
      : affiliate.ethnicity;
    affiliate.gender = dto.genderId
      ? await this.getGender(dto.genderId)
      : affiliate.gender;
    affiliate.identificationType = dto.identificationTypeId
      ? await this.getIdentificationType(dto.identificationTypeId)
      : affiliate.identificationType;
    affiliate.level = dto.levelId
      ? await this.getLevel(dto.levelId)
      : affiliate.level;
    affiliate.membershipClass = dto.membershipClassId
      ? await this.getMembershipClass(dto.membershipClassId)
      : affiliate.membershipClass;
    affiliate.methodology = dto.methodologyId
      ? await this.getMethodology(dto.methodologyId)
      : affiliate.methodology;
    affiliate.groupSubgroup = dto.groupSubgroupId
      ? await this.getGroupSubgroup(dto.groupSubgroupId)
      : affiliate.groupSubgroup;

    return affiliate;
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
      'Population type',
    );
  }

  private async getEps(epsId: number) {
    return this.validateEntity(this.epsRepository, epsId, 'EPS');
  }

  private async getAffiliateType(affiliateTypeId: number) {
    return this.validateEntity(
      this.affiliateTypeRepository,
      affiliateTypeId,
      'Affiliate type',
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
      'Disability type',
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
      'Identification type',
    );
  }

  private async getLevel(levelId: number) {
    return this.validateEntity(this.levelRepository, levelId, 'Level');
  }

  private async getMembershipClass(membershipClassId: number) {
    return this.validateEntity(
      this.membershipClassRepository,
      membershipClassId,
      'Membership class',
    );
  }

  private async getMethodology(methodologyId: number) {
    return this.validateEntity(
      this.methodologyRepository,
      methodologyId,
      'Methodology',
    );
  }

  private async getGroupSubgroup(groupId: number) {
    return this.validateEntity(
      this.groupSubgroupRepository,
      groupId,
      'Group-Subgroup',
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
