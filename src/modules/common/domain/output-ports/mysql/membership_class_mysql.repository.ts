import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IMembershipClassRepository } from '../membership_class.repository';
import { Membership_classEntity } from '../../../../../common/entities/membership_class.entity';

@Injectable()
export class Membership_class_mysqlRepository
  implements IMembershipClassRepository
{
  constructor(
    @InjectRepository(Membership_classEntity)
    private readonly repository: Repository<Membership_classEntity>,
  ) {}

  async findOneBy(
    id: Partial<Membership_classEntity>,
  ): Promise<Membership_classEntity> {
    return await this.repository.findOneBy(id);
  }
}
