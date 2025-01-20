import { Injectable } from '@nestjs/common';
import { IAffiliateRepository } from '../affiliate.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AffiliatesEntity } from '../../../../../common/entities/affiliate.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class AffiliateMysqlRepository implements IAffiliateRepository {
  constructor(
    @InjectRepository(AffiliatesEntity)
    private readonly repository: Repository<AffiliatesEntity>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(entity: AffiliatesEntity): Promise<AffiliatesEntity> {
    return await this.entityManager.save(entity);
  }

  async findOneBy(
    condition: Partial<AffiliatesEntity>,
  ): Promise<AffiliatesEntity> {
    return await this.repository.findOneBy(condition);
  }

  async update(
    id: number,
    updateData: Partial<AffiliatesEntity>,
  ): Promise<AffiliatesEntity> {
    await this.repository.update(id, updateData);
    return await this.findOneBy({ id });
  }
}
