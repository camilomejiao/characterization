import { Controller, Get } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MethodologyEntity } from '../../../../common/entities/methodology.entity';

@Controller('methodology')
export class MethodologyController {
  constructor(
    @InjectRepository(MethodologyEntity)
    private readonly methodologyRepository: Repository<MethodologyEntity>,
  ) {}

  @Get()
  async getMethodology() {
    return await this.methodologyRepository.find();
  }
}
