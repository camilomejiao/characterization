import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CountryEntity } from '../../../../common/entities/country.entity';

@Controller('countries')
export class CountryController {
  constructor(
    @InjectRepository(CountryEntity)
    private readonly countriesRepository: Repository<CountryEntity>,
  ) {}

  @Get()
  async getCountries() {
    return await this.countriesRepository.find();
  }
}
