import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IReasonPqrsRepository } from '../reason_pqrs.repository';
import { Reason_pqrsEntity } from '../../../../../common/entities/reason_pqrs.entity';

@Injectable()
export class Reason_pqrs_mysqlRepository implements IReasonPqrsRepository {
  constructor(
    @InjectRepository(Reason_pqrsEntity)
    private readonly repository: Repository<Reason_pqrsEntity>,
  ) {}

  async findOneBy(id: Partial<Reason_pqrsEntity>): Promise<Reason_pqrsEntity> {
    return await this.repository.findOneBy(id);
  }
}
