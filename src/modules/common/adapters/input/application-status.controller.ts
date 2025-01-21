import { Controller, Get } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicationStatusEntity } from '../../../../common/entities/application-status.entity';

@Controller('application-status')
export class ApplicationStatusController {
  constructor(
    @InjectRepository(ApplicationStatusEntity)
    private readonly applicationStatusRepository: Repository<ApplicationStatusEntity>,
  ) {}

  @Get()
  async getApplicationStatus() {
    return await this.applicationStatusRepository.find();
  }
}
