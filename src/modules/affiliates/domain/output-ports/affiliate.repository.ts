import { AffiliatesEntity } from '../../../../common/entities/affiliate.entity';

export interface IAffiliateRepository {
  create(entity: AffiliatesEntity): Promise<AffiliatesEntity>;

  findAll(): Promise<AffiliatesEntity[]>;

  findById(id): Promise<AffiliatesEntity>;

  findOneBy(condition: Partial<AffiliatesEntity>): Promise<AffiliatesEntity>;

  update(entity: AffiliatesEntity): Promise<AffiliatesEntity>;
}

export const IAffiliateRepository = Symbol('IAffiliateRepository');
