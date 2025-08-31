import { CountryEntity } from '../../../../common/entities/country.entity';

export interface ICountryRepository {
  findOneBy(id: Partial<CountryEntity>): Promise<CountryEntity>;
}

export const ICountryRepository = Symbol('ICountryRepository');
