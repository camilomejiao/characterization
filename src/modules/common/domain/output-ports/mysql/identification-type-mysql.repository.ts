import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IdentificationTypeEntity } from '../../../../../common/entities/identification-type.entity';
import { Repository } from 'typeorm';
import { IIdentificationTypeRepository } from '../identification-type.repository';

@Injectable()
export class IdentificationTypeMysqlRepository
  implements IIdentificationTypeRepository
{
  constructor(
    @InjectRepository(IdentificationTypeEntity)
    private readonly repository: Repository<IdentificationTypeEntity>,
  ) {}

  async findOneBy(
    id: Partial<IdentificationTypeEntity>,
  ): Promise<IdentificationTypeEntity> {
    return await this.repository.findOneBy(id);
  }
}
