import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PopulationTypeEntity } from '../../../../../common/entities/population-type.entity';
import { IPopulationTypeRepository } from '../population-type.repository';

@Injectable()
export class PopulationTypeMysqlRepository
  implements IPopulationTypeRepository
{
  constructor(
    @InjectRepository(PopulationTypeEntity)
    private readonly repository: Repository<PopulationTypeEntity>,
  ) {}

  async findOneBy(
    id: Partial<PopulationTypeEntity>,
  ): Promise<PopulationTypeEntity> {
    return await this.repository.findOneBy(id);
  }
}
