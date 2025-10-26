import { Controller, Get } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Disability_typeEntity } from '../../../../common/entities/disability_type.entity';

@Controller('disability-type')
export class Disability_typeController {
  constructor(
    @InjectRepository(Disability_typeEntity)
    private readonly disabilityTypeRepository: Repository<Disability_typeEntity>,
  ) {}

  @Get()
  async getDisabilityType() {
    return await this.disabilityTypeRepository.find();
  }
}
