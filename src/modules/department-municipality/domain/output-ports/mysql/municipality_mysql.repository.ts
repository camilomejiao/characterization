import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IMunicipalityRepository } from '../municipality.repository';
import { MunicipalityEntity } from '../../../../../common/entities/municipality.entity';

@Injectable()
export class Municipality_mysqlRepository implements IMunicipalityRepository {
  constructor(
    @InjectRepository(MunicipalityEntity)
    private readonly repository: Repository<MunicipalityEntity>,
  ) {}

  async findOneBy(
    condition: Partial<MunicipalityEntity>,
  ): Promise<MunicipalityEntity | null> {
    return await this.repository.findOneBy(condition);
  }
}
