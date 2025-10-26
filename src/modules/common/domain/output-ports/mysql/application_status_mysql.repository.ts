import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IApplicationStatusRepository } from '../application_status.repository';
import { Application_statusEntity } from '../../../../../common/entities/application_status.entity';

@Injectable()
export class Application_status_mysqlRepository
  implements IApplicationStatusRepository
{
  constructor(
    @InjectRepository(Application_statusEntity)
    private readonly repository: Repository<Application_statusEntity>,
  ) {}

  async findOneBy(
    id: Partial<Application_statusEntity>,
  ): Promise<Application_statusEntity> {
    return await this.repository.findOneBy(id);
  }
}
