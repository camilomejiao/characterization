import { RegimeEntity } from '../../../../common/entities/regime.entity';

export interface IRegimeRepository {
  findOneBy(id: Partial<RegimeEntity>): Promise<RegimeEntity>;
}
export const IRegimeRepository = Symbol('IRegimeRepository');
