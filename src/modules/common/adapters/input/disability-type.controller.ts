import { Controller, Get } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DisabilityTypeEntity } from '../../../../common/entities/disability-type.entity';

@Controller('disability-type')
export class DisabilityTypeController {
  constructor(
    @InjectRepository(DisabilityTypeEntity)
    private readonly disabilityTypeRepository: Repository<DisabilityTypeEntity>,
  ) {}

  @Get()
  async getDisabilityType() {
    return await this.disabilityTypeRepository.find();
  }
}
