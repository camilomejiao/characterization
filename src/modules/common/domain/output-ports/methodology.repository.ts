import { MethodologyEntity } from '../../../../common/entities/methodology.entity';

export interface IMethodologyRepository {
  findOneBy(id: Partial<MethodologyEntity>): Promise<MethodologyEntity>;
}
export const IMethodologyRepository = Symbol('IMethodologyRepository');
