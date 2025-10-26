import { Injectable } from '@nestjs/common';
import { ICountryRepository } from '../country.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CountryEntity } from '../../../../../common/entities/country.entity';

@Injectable()
export class Country_mysqlRepository implements ICountryRepository {
  constructor(
    @InjectRepository(CountryEntity)
    private readonly repository: Repository<CountryEntity>,
  ) {}

  async findOneBy(id: Partial<CountryEntity>): Promise<CountryEntity> {
    return await this.repository.findOneBy(id);
  }
}
