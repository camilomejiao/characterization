import { Affiliate_typeEntity } from '../../../../common/entities/affiliate_type.entity';

export interface IAffiliateTypeRepository {
  findOneBy(id: Partial<Affiliate_typeEntity>): Promise<Affiliate_typeEntity>;
}
export const IAffiliateTypeRepository = Symbol('IAffiliateTypeRepository');
