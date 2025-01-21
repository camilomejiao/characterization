import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IPqrsTypeRepository } from '../pqrs-type.repository';
import { PqrsTypeEntity } from '../../../../../common/entities/pqrs-type.entity';

@Injectable()
export class PqrsTypeMysqlRepository implements IPqrsTypeRepository {
  constructor(
    @InjectRepository(PqrsTypeEntity)
    private readonly repository: Repository<PqrsTypeEntity>,
  ) {}

  async findOneBy(id: Partial<PqrsTypeEntity>): Promise<PqrsTypeEntity> {
    return await this.repository.findOneBy(id);
  }
}
