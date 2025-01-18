import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IdentificationTypeEntity } from '../../../../common/entities/identification-type.entity';
import { Repository } from 'typeorm';

@Controller('identification-type')
export class IdentificationTypeController {
  constructor(
    @InjectRepository(IdentificationTypeEntity)
    private readonly identificationTypeRepository: Repository<IdentificationTypeEntity>,
  ) {}

  @Get()
  async getIdentificationType() {
    return await this.identificationTypeRepository.find();
  }
}
