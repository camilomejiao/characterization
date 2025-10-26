import { Controller, Get } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SexEntity } from '../../../../common/entities/sex.entity';

@Controller('sex')
export class SexController {
  constructor(
    @InjectRepository(SexEntity)
    private readonly sexRepository: Repository<SexEntity>,
  ) {}

  @Get()
  async getSex() {
    return await this.sexRepository.find();
  }
}
