import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IAffiliateTypeRepository } from '../affiliate_type.repository';
import { Affiliate_typeEntity } from '../../../../../common/entities/affiliate_type.entity';

@Injectable()
export class Affiliate_type_mysqlRepository
  implements IAffiliateTypeRepository
{
  constructor(
    @InjectRepository(Affiliate_typeEntity)
    private readonly repository: Repository<Affiliate_typeEntity>,
  ) {}

  async findOneBy(
    id: Partial<Affiliate_typeEntity>,
  ): Promise<Affiliate_typeEntity> {
    return await this.repository.findOneBy(id);
  }
}
