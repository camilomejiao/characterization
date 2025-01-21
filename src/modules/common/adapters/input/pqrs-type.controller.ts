import { Controller, Get } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PqrsTypeEntity } from '../../../../common/entities/pqrs-type.entity';

@Controller('pqrs-type')
export class PqrsTypeController {
  constructor(
    @InjectRepository(PqrsTypeEntity)
    private readonly pqrsTypeEntityRepository: Repository<PqrsTypeEntity>,
  ) {}

  @Get()
  async getpqrsType() {
    return await this.pqrsTypeEntityRepository.find();
  }
}
