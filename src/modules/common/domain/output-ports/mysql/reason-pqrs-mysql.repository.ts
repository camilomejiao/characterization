import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IReasonPqrsRepository } from '../reason-pqrs.repository';
import { ReasonPqrsEntity } from '../../../../../common/entities/reason-pqrs.entity';

@Injectable()
export class ReasonPqrsMysqlRepository implements IReasonPqrsRepository {
  constructor(
    @InjectRepository(ReasonPqrsEntity)
    private readonly repository: Repository<ReasonPqrsEntity>,
  ) {}

  async findOneBy(id: Partial<ReasonPqrsEntity>): Promise<ReasonPqrsEntity> {
    return await this.repository.findOneBy(id);
  }
}
