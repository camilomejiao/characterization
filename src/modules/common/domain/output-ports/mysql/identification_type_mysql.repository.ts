import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Identification_typeEntity } from '../../../../../common/entities/identification_type.entity';
import { Repository } from 'typeorm';
import { IIdentificationTypeRepository } from '../identification_type.repository';

@Injectable()
export class Identification_type_mysqlRepository
  implements IIdentificationTypeRepository
{
  constructor(
    @InjectRepository(Identification_typeEntity)
    private readonly repository: Repository<Identification_typeEntity>,
  ) {}

  async findOneBy(
    id: Partial<Identification_typeEntity>,
  ): Promise<Identification_typeEntity> {
    return await this.repository.findOneBy(id);
  }
}
