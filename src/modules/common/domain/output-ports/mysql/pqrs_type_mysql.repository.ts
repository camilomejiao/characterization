import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IPqrsTypeRepository } from '../pqrs_type.repository';
import { Pqrs_typeEntity } from '../../../../../common/entities/pqrs_type.entity';

@Injectable()
export class Pqrs_type_mysqlRepository implements IPqrsTypeRepository {
  constructor(
    @InjectRepository(Pqrs_typeEntity)
    private readonly repository: Repository<Pqrs_typeEntity>,
  ) {}

  async findOneBy(id: Partial<Pqrs_typeEntity>): Promise<Pqrs_typeEntity> {
    return await this.repository.findOneBy(id);
  }
}
