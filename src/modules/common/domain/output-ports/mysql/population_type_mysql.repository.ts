import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Population_typeEntity } from '../../../../../common/entities/population_type.entity';
import { IPopulationTypeRepository } from '../population_type.repository';

@Injectable()
export class Population_type_mysqlRepository
  implements IPopulationTypeRepository
{
  constructor(
    @InjectRepository(Population_typeEntity)
    private readonly repository: Repository<Population_typeEntity>,
  ) {}

  async findOneBy(
    id: Partial<Population_typeEntity>,
  ): Promise<Population_typeEntity> {
    return await this.repository.findOneBy(id);
  }
}
