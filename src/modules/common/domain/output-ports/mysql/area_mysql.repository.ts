import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IAreaRepository } from '../area.repository';
import { AreaEntity } from '../../../../../common/entities/area.entity';

@Injectable()
export class Area_mysqlRepository implements IAreaRepository {
  constructor(
    @InjectRepository(AreaEntity)
    private readonly repository: Repository<AreaEntity>,
  ) {}

  async findOneBy(id: Partial<AreaEntity>): Promise<AreaEntity> {
    return await this.repository.findOneBy(id);
  }
}
