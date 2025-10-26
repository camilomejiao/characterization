import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Identification_typeEntity } from '../../../../common/entities/identification_type.entity';
import { Repository } from 'typeorm';

@Controller('identification-type')
export class Identification_typeController {
  constructor(
    @InjectRepository(Identification_typeEntity)
    private readonly identificationTypeRepository: Repository<Identification_typeEntity>,
  ) {}

  @Get()
  async getIdentificationType() {
    return await this.identificationTypeRepository.find();
  }
}
