import { Controller, Get } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EpsEntity } from '../../../../common/entities/eps.entity';

@Controller('eps')
export class EpsController {
  constructor(
    @InjectRepository(EpsEntity)
    private readonly epsRepository: Repository<EpsEntity>,
  ) {}

  @Get()
  async getEps() {
    return await this.epsRepository.find();
  }
}
