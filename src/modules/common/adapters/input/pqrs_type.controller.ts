import { Controller, Get } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Pqrs_typeEntity } from '../../../../common/entities/pqrs_type.entity';

@Controller('pqrs-type')
export class Pqrs_typeController {
  constructor(
    @InjectRepository(Pqrs_typeEntity)
    private readonly pqrsTypeEntityRepository: Repository<Pqrs_typeEntity>,
  ) {}

  @Get()
  async getpqrsType() {
    return await this.pqrsTypeEntityRepository.find();
  }
}
