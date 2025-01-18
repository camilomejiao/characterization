import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IMembershipClassRepository } from '../membership-class.repository';
import { MembershipClassEntity } from '../../../../../common/entities/membership-class.entity';

@Injectable()
export class MembershipClassMysqlRepository
  implements IMembershipClassRepository
{
  constructor(
    @InjectRepository(MembershipClassEntity)
    private readonly repository: Repository<MembershipClassEntity>,
  ) {}

  async findOneBy(
    id: Partial<MembershipClassEntity>,
  ): Promise<MembershipClassEntity> {
    return await this.repository.findOneBy(id);
  }
}
