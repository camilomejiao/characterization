import { Controller, Get } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EthnicityEntity } from '../../../../common/entities/ethnicity.entity';

@Controller('ethnicity')
export class EthnicityController {
  constructor(
    @InjectRepository(EthnicityEntity)
    private readonly ethnicityRepository: Repository<EthnicityEntity>,
  ) {}

  @Get()
  async getEthnicity() {
    return await this.ethnicityRepository.find();
  }
}
