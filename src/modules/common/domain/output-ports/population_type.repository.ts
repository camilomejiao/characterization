import { Population_typeEntity } from '../../../../common/entities/population_type.entity';

export interface IPopulationTypeRepository {
  findOneBy(id: Partial<Population_typeEntity>): Promise<Population_typeEntity>;
}
export const IPopulationTypeRepository = Symbol('IPopulationTypeRepository');
