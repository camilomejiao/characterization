import { Injectable } from '@nestjs/common';
import { IAffiliateRepository } from '../affiliate.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AffiliatesEntity } from '../../../../../common/entities/affiliate.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class Affiliate_mysqlRepository implements IAffiliateRepository {
  constructor(
    @InjectRepository(AffiliatesEntity)
    private readonly repository: Repository<AffiliatesEntity>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(entity: AffiliatesEntity): Promise<AffiliatesEntity> {
    return await this.entityManager.save(entity);
  }

  async findAll(): Promise<AffiliatesEntity[]> {
    return await this.repository.find({
      relations: [
        'user',
        'populationType',
        'eps',
        'state',
        'affiliateType',
        'methodology',
        'level',
        'membershipClass',
        'ethnicity',
        'community',
        'groupSubgroup',
      ],
    });
  }

  async findById(id: number): Promise<AffiliatesEntity> {
    return await this.repository.findOne({
      where: { id },
      relations: [
        'user',
        'regime',
        'populationType',
        'eps',
        'ipsPrimary',
        'ipsDental',
        'affiliateType',
        'methodology',
        'level',
        'membershipClass',
        'ethnicity',
        'community',
        'groupSubgroup',
        'state',
      ],
    });
  }

  async findOneBy(
    condition: Partial<AffiliatesEntity>,
  ): Promise<AffiliatesEntity> {
    return await this.repository.findOneBy(condition);
  }

  async update(entity: Partial<AffiliatesEntity>): Promise<AffiliatesEntity> {
    return this.repository.save(entity);
  }
}
