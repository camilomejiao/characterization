import { Controller, Get } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Affiliate_typeEntity } from '../../../../common/entities/affiliate_type.entity';

@Controller('affiliate-type')
export class Affiliate_typeController {
  constructor(
    @InjectRepository(Affiliate_typeEntity)
    private readonly affiliateTypeRepository: Repository<Affiliate_typeEntity>,
  ) {}

  @Get()
  async getAffiliateType() {
    return await this.affiliateTypeRepository.find();
  }
}
