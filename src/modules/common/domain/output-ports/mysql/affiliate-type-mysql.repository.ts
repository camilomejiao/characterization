import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IAffiliateTypeRepository } from '../affiliate-type.repository';
import { AffiliateTypeEntity } from '../../../../../common/entities/affiliate-type.entity';

@Injectable()
export class AffiliateTypeMysqlRepository implements IAffiliateTypeRepository {
  constructor(
    @InjectRepository(AffiliateTypeEntity)
    private readonly repository: Repository<AffiliateTypeEntity>,
  ) {}

  async findOneBy(
    id: Partial<AffiliateTypeEntity>,
  ): Promise<AffiliateTypeEntity> {
    return await this.repository.findOneBy(id);
  }
}
