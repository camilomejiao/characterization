import { Inject, NotFoundException } from '@nestjs/common';
import { IAffiliateRepository } from '../../output-ports/affiliate.repository';
import { UserEntity } from '../../../../../common/entities/user.entity';
import { AffiliatesEntity } from '../../../../../common/entities/affiliate.entity';
import { LMAEntity } from '../../../../../common/entities/lma.entity';
import { Affiliate_historyEntity } from '../../../../../common/entities/affiliate_history.entity';

export class GetAffiliateInformationUsecase {
  constructor(
    @Inject(IAffiliateRepository)
    private affiliateRepository: IAffiliateRepository,
  ) {}

  public async handler(identificationNumber: number): Promise<{
    user: UserEntity;
    affiliate: AffiliatesEntity;
    lma: LMAEntity[];
    history: Affiliate_historyEntity[];
  }> {
    try {
      const user =
        await this.affiliateRepository.findUserAndAffiliateByIdNumber(
          identificationNumber,
        );

      console.log('identificationNumber: ', identificationNumber);
      console.log('user: ', user);

      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }

      const affiliate = user.affiliate;

      return {
        user,
        affiliate,
        lma: affiliate.LMAUser ?? [],
        history: affiliate.historyUser ?? [],
      };
    } catch (error) {
      console.log(error);
    }
  }
}
