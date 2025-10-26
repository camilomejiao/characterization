import { Identification_typeEntity } from '../../../../common/entities/identification_type.entity';

export interface IIdentificationTypeRepository {
  findOneBy(
    id: Partial<Identification_typeEntity>,
  ): Promise<Identification_typeEntity>;
}

export const IIdentificationTypeRepository = Symbol(
  'IIdentificationTypeRepository',
);
