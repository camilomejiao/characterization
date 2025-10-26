import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IMethodologyRepository } from '../methodology.repository';
import { MethodologyEntity } from '../../../../../common/entities/methodology.entity';

@Injectable()
export class Methodology_mysqlRepository implements IMethodologyRepository {
  constructor(
    @InjectRepository(MethodologyEntity)
    private readonly repository: Repository<MethodologyEntity>,
  ) {}

  async findOneBy(id: Partial<MethodologyEntity>): Promise<MethodologyEntity> {
    return await this.repository.findOneBy(id);
  }
}
