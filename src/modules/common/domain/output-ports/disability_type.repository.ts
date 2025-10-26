import { Disability_typeEntity } from '../../../../common/entities/disability_type.entity';

export interface IDisabilityTypeRepository {
  findOneBy(id: Partial<Disability_typeEntity>): Promise<Disability_typeEntity>;
}
export const IDisabilityTypeRepository = Symbol('IDisabilityTypeRepository');
