import { Controller, Get } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AffiliateTypeEntity } from '../../../../common/entities/affiliate-type.entity';

@Controller('affiliate_type')
export class AffiliateTypeController {
  constructor(
    @InjectRepository(AffiliateTypeEntity)
    private readonly affiliateTypeRepository: Repository<AffiliateTypeEntity>,
  ) {}

  @Get()
  async getAffiliateType() {
    return await this.affiliateTypeRepository.find();
  }
}
