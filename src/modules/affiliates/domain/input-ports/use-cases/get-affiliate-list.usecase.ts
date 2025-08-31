import { Inject } from '@nestjs/common';
import { IAffiliateRepository } from '../../output-ports/affiliate.repository';
import { AffiliatesEntity } from '../../../../../common/entities/affiliate.entity';

export class GetAffiliateListUsecase {
  constructor(
    @Inject(IAffiliateRepository)
    private affiliateRepository: IAffiliateRepository,
  ) {}

  public async handler(): Promise<AffiliatesEntity[]> {
    return await this.affiliateRepository.findAll();
  }
}
