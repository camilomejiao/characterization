import { EpsEntity } from '../../../../common/entities/eps.entity';

export interface IEpsRepository {
  findOneBy(id: Partial<EpsEntity>): Promise<EpsEntity>;
}
export const IEpsRepository = Symbol('IEpsRepository');
