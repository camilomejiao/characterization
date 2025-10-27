import { SpecialPopulationEntity } from '../../../../common/entities/special_population.entity';

export interface ISpecialPopulationRepository {
  create(entity: SpecialPopulationEntity): Promise<SpecialPopulationEntity>;

  findAll(): Promise<SpecialPopulationEntity[]>;

  findById(id): Promise<SpecialPopulationEntity>;

  findOneBy(
    condition: Partial<SpecialPopulationEntity>,
  ): Promise<SpecialPopulationEntity>;

  update(entity: SpecialPopulationEntity): Promise<SpecialPopulationEntity>;
}

export const ISpecialPopulationRepository = Symbol(
  'ISpecialPopulationRepository',
);
