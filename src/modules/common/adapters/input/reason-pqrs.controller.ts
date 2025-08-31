import { Controller, Get } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ReasonPqrsEntity } from '../../../../common/entities/reason-pqrs.entity';

@Controller('reason-pqrs')
export class ReasonPqrsController {
  constructor(
    @InjectRepository(ReasonPqrsEntity)
    private readonly reasonPqrsEntityRepository: Repository<ReasonPqrsEntity>,
  ) {}

  @Get()
  async getReasonPqrs() {
    return await this.reasonPqrsEntityRepository.find();
  }
}
