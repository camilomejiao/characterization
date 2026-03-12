import { Inject } from '@nestjs/common';
import { ISpecialPopulationRepository } from '../../output-ports/special_population.repository';

export class DeleteSpecialPopulationUsecase {
  constructor(
    @Inject(ISpecialPopulationRepository)
    private specialPopulationRepository: ISpecialPopulationRepository,
  ) {}

  public async handler(id: number) {
    return await this.specialPopulationRepository.delete(id);
  }
}
