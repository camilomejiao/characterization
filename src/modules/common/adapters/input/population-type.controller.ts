import { Controller, Get } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PopulationTypeEntity } from '../../../../common/entities/population-type.entity';

@Controller('population-type')
export class PopulationTypeController {
  constructor(
    @InjectRepository(PopulationTypeEntity)
    private readonly populationTypeRepository: Repository<PopulationTypeEntity>,
  ) {}

  @Get()
  async getPopulationType() {
    return await this.populationTypeRepository.find();
  }
}
