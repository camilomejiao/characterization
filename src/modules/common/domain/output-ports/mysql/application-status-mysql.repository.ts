import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IApplicationStatusRepository } from '../application-status.repository';
import { ApplicationStatusEntity } from '../../../../../common/entities/application-status.entity';

@Injectable()
export class ApplicationStatusMysqlRepository
  implements IApplicationStatusRepository
{
  constructor(
    @InjectRepository(ApplicationStatusEntity)
    private readonly repository: Repository<ApplicationStatusEntity>,
  ) {}

  async findOneBy(
    id: Partial<ApplicationStatusEntity>,
  ): Promise<ApplicationStatusEntity> {
    return await this.repository.findOneBy(id);
  }
}
