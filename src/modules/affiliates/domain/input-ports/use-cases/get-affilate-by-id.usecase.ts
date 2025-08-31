import { Inject } from '@nestjs/common';
import { IAffiliateRepository } from '../../output-ports/affiliate.repository';

export class GetAffilateByIdUsecase {
  constructor(
    @Inject(IAffiliateRepository)
    private affiliateRepository: IAffiliateRepository,
  ) {}

  public async handler(id: number) {
    return await this.affiliateRepository.findById(id);
  }
}
