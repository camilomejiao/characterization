import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IDisabilityTypeRepository } from '../disability_type.repository';
import { Disability_typeEntity } from '../../../../../common/entities/disability_type.entity';

@Injectable()
export class Disability_type_mysqlRepository
  implements IDisabilityTypeRepository
{
  constructor(
    @InjectRepository(Disability_typeEntity)
    private readonly repository: Repository<Disability_typeEntity>,
  ) {}

  async findOneBy(
    id: Partial<Disability_typeEntity>,
  ): Promise<Disability_typeEntity> {
    return await this.repository.findOneBy(id);
  }
}
