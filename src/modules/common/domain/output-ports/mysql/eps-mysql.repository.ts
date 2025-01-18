import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IEpsRepository } from '../eps.repository';
import { EpsEntity } from '../../../../../common/entities/eps.entity';

@Injectable()
export class EpsMysqlRepository implements IEpsRepository {
  constructor(
    @InjectRepository(EpsEntity)
    private readonly repository: Repository<EpsEntity>,
  ) {}

  async findOneBy(id: Partial<EpsEntity>): Promise<EpsEntity> {
    return await this.repository.findOneBy(id);
  }
}
