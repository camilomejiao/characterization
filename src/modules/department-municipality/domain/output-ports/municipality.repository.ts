import { MunicipalityEntity } from '../../../../common/entities/municipality.entity';

export interface IMunicipalityRepository {
  findOneBy(
    condition: Partial<MunicipalityEntity>,
  ): Promise<MunicipalityEntity | null>;
}
export const IMunicipalityRepository = Symbol('IMunicipalityRepository');
