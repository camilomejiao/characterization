import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ISexRepository } from '../sex.repository';
import { SexEntity } from '../../../../../common/entities/sex.entity';

@Injectable()
export class Sex_mysqlRepository implements ISexRepository {
  constructor(
    @InjectRepository(SexEntity)
    private readonly repository: Repository<SexEntity>,
  ) {}

  async findOneBy(id: Partial<SexEntity>): Promise<SexEntity> {
    return await this.repository.findOneBy(id);
  }
}
