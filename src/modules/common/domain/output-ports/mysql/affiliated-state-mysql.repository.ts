import { IAffiliatedStateRepository } from '../affiliated-state.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AffiliatedStateEntity } from '../../../../../common/entities/affiliated-state.entity';

@Injectable()
export class AffiliatedStateMysqlRepository
  implements IAffiliatedStateRepository
{
  constructor(
    @InjectRepository(AffiliatedStateEntity)
    private readonly repository: Repository<AffiliatedStateEntity>,
  ) {}

  async findOneBy(
    id: Partial<AffiliatedStateEntity>,
  ): Promise<AffiliatedStateEntity> {
    return await this.repository.findOneBy(id);
  }
}
