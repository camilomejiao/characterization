import { Controller, Get } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RegimeEntity } from '../../../../common/entities/regime.entity';

@Controller('regime')
export class RegimeController {
  constructor(
    @InjectRepository(RegimeEntity)
    private readonly sexRepository: Repository<RegimeEntity>,
  ) {}

  @Get()
  async getRegime() {
    return await this.sexRepository.find();
  }
}
