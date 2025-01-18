import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IDisabilityTypeRepository } from '../disability-type.repository';
import { DisabilityTypeEntity } from '../../../../../common/entities/disability-type.entity';

@Injectable()
export class DisabilityTypeMysqlRepository
  implements IDisabilityTypeRepository
{
  constructor(
    @InjectRepository(DisabilityTypeEntity)
    private readonly repository: Repository<DisabilityTypeEntity>,
  ) {}

  async findOneBy(
    id: Partial<DisabilityTypeEntity>,
  ): Promise<DisabilityTypeEntity> {
    return await this.repository.findOneBy(id);
  }
}
