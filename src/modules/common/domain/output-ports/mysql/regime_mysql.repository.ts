import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IRegimeRepository } from '../regime.repository';
import { RegimeEntity } from '../../../../../common/entities/regime.entity';

@Injectable()
export class RegimeMysqlRepository implements IRegimeRepository {
  constructor(
    @InjectRepository(RegimeEntity)
    private readonly repository: Repository<RegimeEntity>,
  ) {}

  async findOneBy(id: Partial<RegimeEntity>): Promise<RegimeEntity> {
    return await this.repository.findOneBy(id);
  }
}
