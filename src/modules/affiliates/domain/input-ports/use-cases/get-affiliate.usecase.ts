import { AffiliatesEntity } from '../../../../../common/entities/affiliate.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export class GetAffiliateUsecase {
  constructor(
    @InjectRepository(AffiliatesEntity)
    private affiliateRepository: Repository<AffiliatesEntity>,
  ) {}

  public async handler(
    identificationNumber: number,
  ): Promise<AffiliatesEntity> {
    const affiliate = await this.affiliateRepository.findOne({
      where: { identificationNumber: identificationNumber },
      relations: [
        'department',
        'municipality',
        'populationType',
        'eps',
        'affiliateType',
        'area',
        'community',
        'disabilityType',
        'ethnicity',
        'gender',
        'identificationType',
        'level',
        'membershipClass',
        'methodology',
      ],
    });

    if (!affiliate) {
      throw new Error(
        `Affiliate with identification number ${identificationNumber} not found`,
      );
    }

    return affiliate;
  }
}
