import { DisabilityTypeEntity } from '../../../../common/entities/disability-type.entity';

export interface IDisabilityTypeRepository {
  findOneBy(id: Partial<DisabilityTypeEntity>): Promise<DisabilityTypeEntity>;
}
export const IDisabilityTypeRepository = Symbol('IDisabilityTypeRepository');
