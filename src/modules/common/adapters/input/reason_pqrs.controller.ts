import { Controller, Get } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Reason_pqrsEntity } from '../../../../common/entities/reason_pqrs.entity';

@Controller('reason-pqrs')
export class Reason_pqrsController {
  constructor(
    @InjectRepository(Reason_pqrsEntity)
    private readonly reasonPqrsEntityRepository: Repository<Reason_pqrsEntity>,
  ) {}

  @Get()
  async getReasonPqrs() {
    return await this.reasonPqrsEntityRepository.find();
  }
}
