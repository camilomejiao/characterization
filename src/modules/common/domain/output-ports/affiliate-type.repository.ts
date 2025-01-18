import { AffiliateTypeEntity } from '../../../../common/entities/affiliate-type.entity';

export interface IAffiliateTypeRepository {
  findOneBy(id: Partial<AffiliateTypeEntity>): Promise<AffiliateTypeEntity>;
}
export const IAffiliateTypeRepository = Symbol('IAffiliateTypeRepository');
