import { IAffiliatedStateRepository } from '../affiliated_state.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Affiliated_stateEntity } from '../../../../../common/entities/affiliated_state.entity';

@Injectable()
export class AffiliatedStateMysqlRepository
  implements IAffiliatedStateRepository
{
  constructor(
    @InjectRepository(Affiliated_stateEntity)
    private readonly repository: Repository<Affiliated_stateEntity>,
  ) {}

  async findOneBy(
    id: Partial<Affiliated_stateEntity>,
  ): Promise<Affiliated_stateEntity> {
    return await this.repository.findOneBy(id);
  }
}
