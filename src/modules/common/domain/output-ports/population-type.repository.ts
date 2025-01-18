import { PopulationTypeEntity } from '../../../../common/entities/population-type.entity';

export interface IPopulationTypeRepository {
  findOneBy(id: Partial<PopulationTypeEntity>): Promise<PopulationTypeEntity>;
}
export const IPopulationTypeRepository = Symbol('IPopulationTypeRepository');
