import { Inject } from '@nestjs/common';

//Entity
import { AffiliatesEntity } from '../../../../../common/entities/affiliate.entity';

//Repository
import { IPopulationTypeRepository } from '../../../../common/domain/output-ports/population_type.repository';
import { IEpsRepository } from '../../../../common/domain/output-ports/eps.repository';
import { IAffiliateTypeRepository } from '../../../../common/domain/output-ports/affiliate_type.repository';
import { IMethodologyRepository } from '../../../../common/domain/output-ports/methodology.repository';
import { ILevelRepository } from '../../../../common/domain/output-ports/level.repository';
import { IMembershipClassRepository } from '../../../../common/domain/output-ports/membership_class.repository';
import { IEthnicityRepository } from '../../../../common/domain/output-ports/ethnicity.repository';
import { ICommunityRepository } from '../../../../common/domain/output-ports/community.repository';
import { IGroupSubgroupRespository } from '../../../../common/domain/output-ports/group_subgroup.respository';
import { IIps_primaryRepository } from '../../../../common/domain/output-ports/ips_primary.repository';
import { IIps_dentalRepository } from '../../../../common/domain/output-ports/ips_dental.repository';
import { IRegimeRepository } from '../../../../common/domain/output-ports/regime.repository';

export class Validate_and_assign_relationsUsecase {
  constructor(
    @Inject(IRegimeRepository)
    private readonly regimeRepository: IRegimeRepository,
    @Inject(IPopulationTypeRepository)
    private readonly populationTypeRepository: IPopulationTypeRepository,
    @Inject(IEpsRepository)
    private readonly epsRepository: IEpsRepository,
    @Inject(IIps_primaryRepository)
    private readonly ipsPrimaryRepository: IIps_primaryRepository,
    @Inject(IIps_dentalRepository)
    private readonly ipsDentalRepository: IIps_dentalRepository,
    @Inject(IAffiliateTypeRepository)
    private readonly affiliateTypeRepository: IAffiliateTypeRepository,
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
    affiliate.regime = dto.regimeId
      ? await this.getRegime(dto.regimeId)
      : affiliate.regime;
    affiliate.populationType = dto.populationTypeId
      ? await this.getPopulationType(dto.populationTypeId)
      : affiliate.populationType;
    affiliate.eps = dto.epsId ? await this.getEps(dto.epsId) : affiliate.eps;
    affiliate.ipsPrimary = dto.ipsPrimaryId
      ? await this.getIPSPrimary(dto.ipsPrimaryId)
      : affiliate.ipsPrimary;
    affiliate.ipsDental = dto.ipsDentalId
      ? await this.getIpsDental(dto.ipsDentalId)
      : affiliate.ipsDental;
    affiliate.affiliateType = dto.affiliateTypeId
      ? await this.getAffiliateType(dto.affiliateTypeId)
      : affiliate.affiliateType;
    affiliate.community = dto.communityId
      ? await this.getCommunity(dto.communityId)
      : affiliate.community;
    affiliate.ethnicity = dto.ethnicityId
      ? await this.getEthnicity(dto.ethnicityId)
      : affiliate.ethnicity;
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
    affiliate.state = dto.stateId
      ? await this.getGroupSubgroup(dto.stateId)
      : affiliate.state;

    return affiliate;
  }

  private async getRegime(regimeId: number) {
    return this.validateEntity(this.regimeRepository, regimeId, 'Regimen');
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

  private async getIPSPrimary(primaryId: number) {
    return this.validateEntity(
      this.ipsPrimaryRepository,
      primaryId,
      'IPSPrimary',
    );
  }

  private async getIpsDental(dentalId: number) {
    return this.validateEntity(this.ipsDentalRepository, dentalId, 'IPSDental');
  }

  private async getAffiliateType(affiliateTypeId: number) {
    return this.validateEntity(
      this.affiliateTypeRepository,
      affiliateTypeId,
      'Affiliate type',
    );
  }

  private async getEthnicity(ethnicityId: number) {
    return this.validateEntity(
      this.ethnicityRepository,
      ethnicityId,
      'Ethnicity',
    );
  }

  private async getCommunity(communityId: number) {
    return this.validateEntity(
      this.communityRepository,
      communityId,
      'Community',
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
