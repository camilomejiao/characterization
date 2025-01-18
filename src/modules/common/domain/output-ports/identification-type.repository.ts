import { IdentificationTypeEntity } from '../../../../common/entities/identification-type.entity';

export interface IIdentificationTypeRepository {
  findOneBy(
    id: Partial<IdentificationTypeEntity>,
  ): Promise<IdentificationTypeEntity>;
}

export const IIdentificationTypeRepository = Symbol(
  'IIdentificationTypeRepository',
);
