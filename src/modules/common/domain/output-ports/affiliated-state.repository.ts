import { AffiliatedStateEntity } from '../../../../common/entities/affiliated-state.entity';

export interface IAffiliatedStateRepository {
  findOneBy(id: Partial<AffiliatedStateEntity>): Promise<AffiliatedStateEntity>;
}

export const IAffiliatedStateRepository = Symbol('IAffiliatedStateRepository');
