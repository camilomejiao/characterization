import { Inject } from '@nestjs/common';
import { IAffiliateRepository } from '../../output-ports/affiliate.repository';

export class Get_affilate_by_idUsecase {
  constructor(
    @Inject(IAffiliateRepository)
    private affiliateRepository: IAffiliateRepository,
  ) {}

  public async handler(id: number) {
    try {
      return await this.affiliateRepository.findById(id);
    } catch (error) {
      console.log(error);
    }
  }
}
