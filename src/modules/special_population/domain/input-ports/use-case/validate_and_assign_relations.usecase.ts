import { Inject } from '@nestjs/common';

//Entity
import { SpecialPopulationEntity } from '../../../../../common/entities/special_population.entity';

//Repository
import { IPopulationTypeRepository } from '../../../../common/domain/output-ports/population_type.repository';
import { IEpsRepository } from '../../../../common/domain/output-ports/eps.repository';
import { IEthnicityRepository } from '../../../../common/domain/output-ports/ethnicity.repository';
import { ICommunityRepository } from '../../../../common/domain/output-ports/community.repository';

export class Validate_and_assign_relationsUsecase {
  constructor(
    @Inject(IPopulationTypeRepository)
    private readonly populationTypeRepository: IPopulationTypeRepository,
    @Inject(IEpsRepository)
    private readonly epsRepository: IEpsRepository,
    @Inject(IEthnicityRepository)
    private readonly ethnicityRepository: IEthnicityRepository,
    @Inject(ICommunityRepository)
    private readonly communityRepository: ICommunityRepository,
  ) {}

  public async handler(
    dto: any,
    specialPopulation: SpecialPopulationEntity,
  ): Promise<SpecialPopulationEntity> {
    // Validar y asignar relaciones
    specialPopulation.populationType = dto.populationTypeId
      ? await this.getPopulationType(dto.populationTypeId)
      : specialPopulation.populationType;
    specialPopulation.eps = dto.epsId
      ? await this.getEps(Number(dto.epsId))
      : null;
    specialPopulation.community = dto.communityId
      ? await this.getCommunity(dto.communityId)
      : specialPopulation.community;
    specialPopulation.ethnicity = dto.ethnicityId
      ? await this.getEthnicity(dto.ethnicityId)
      : specialPopulation.ethnicity;
    return specialPopulation;
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
