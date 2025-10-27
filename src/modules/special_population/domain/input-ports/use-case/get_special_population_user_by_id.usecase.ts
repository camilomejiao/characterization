import { Inject } from '@nestjs/common';
import { ISpecialPopulationRepository } from '../../output-ports/special_population.repository';

export class GetSpecialPopulationUserByIdUsecase {
  constructor(
    @Inject(ISpecialPopulationRepository)
    private specialPopulationRepository: ISpecialPopulationRepository,
  ) {}

  public async handler(id: number) {
    try {
      return await this.specialPopulationRepository.findById(id);
    } catch (error) {
      console.log(error);
    }
  }
}
