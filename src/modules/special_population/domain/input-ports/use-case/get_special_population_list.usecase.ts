import { Inject } from '@nestjs/common';
import { ISpecialPopulationRepository } from '../../output-ports/special_population.repository';
import { SpecialPopulationEntity } from '../../../../../common/entities/special_population.entity';

export class GetSpecialPopulationListUsecase {
  constructor(
    @Inject(ISpecialPopulationRepository)
    private specialPopulationRepository: ISpecialPopulationRepository,
  ) {}

  public async handler(): Promise<SpecialPopulationEntity[]> {
    try {
      return await this.specialPopulationRepository.findAll();
    } catch (error) {
      console.log(error);
    }
  }
}
