import { PqrsTypeEntity } from '../../../../common/entities/pqrs-type.entity';

export interface IPqrsTypeRepository {
  findOneBy(id: Partial<PqrsTypeEntity>): Promise<PqrsTypeEntity>;
}
export const IPqrsTypeRepository = Symbol('IPqrsTypeRepository');
