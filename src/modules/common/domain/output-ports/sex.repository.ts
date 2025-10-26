import { SexEntity } from '../../../../common/entities/sex.entity';

export interface ISexRepository {
  findOneBy(id: Partial<SexEntity>): Promise<SexEntity>;
}
export const ISexRepository = Symbol('ISexRepository');
