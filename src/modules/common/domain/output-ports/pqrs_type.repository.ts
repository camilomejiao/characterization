import { Pqrs_typeEntity } from '../../../../common/entities/pqrs_type.entity';

export interface IPqrsTypeRepository {
  findOneBy(id: Partial<Pqrs_typeEntity>): Promise<Pqrs_typeEntity>;
}
export const IPqrsTypeRepository = Symbol('IPqrsTypeRepository');
