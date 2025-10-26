import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IEthnicityRepository } from '../ethnicity.repository';
import { EthnicityEntity } from '../../../../../common/entities/ethnicity.entity';

@Injectable()
export class Ethnicity_mysqlRepository implements IEthnicityRepository {
  constructor(
    @InjectRepository(EthnicityEntity)
    private readonly repository: Repository<EthnicityEntity>,
  ) {}

  async findOneBy(id: Partial<EthnicityEntity>): Promise<EthnicityEntity> {
    return await this.repository.findOneBy(id);
  }
}
