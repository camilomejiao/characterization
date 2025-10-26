import { Controller, Get } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Population_typeEntity } from '../../../../common/entities/population_type.entity';

@Controller('population-type')
export class Population_typeController {
  constructor(
    @InjectRepository(Population_typeEntity)
    private readonly populationTypeRepository: Repository<Population_typeEntity>,
  ) {}

  @Get()
  async getPopulationType() {
    return await this.populationTypeRepository.find();
  }
}
