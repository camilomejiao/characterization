import { Controller, Get } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Application_statusEntity } from '../../../../common/entities/application_status.entity';

@Controller('application-status')
export class Application_statusController {
  constructor(
    @InjectRepository(Application_statusEntity)
    private readonly applicationStatusRepository: Repository<Application_statusEntity>,
  ) {}

  @Get()
  async getApplicationStatus() {
    return await this.applicationStatusRepository.find();
  }
}
