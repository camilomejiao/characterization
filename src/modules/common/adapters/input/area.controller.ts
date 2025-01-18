import { Controller, Get } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AreaEntity } from '../../../../common/entities/area.entity';

@Controller('area')
export class AreaController {
  constructor(
    @InjectRepository(AreaEntity)
    private readonly areaRepository: Repository<AreaEntity>,
  ) {}

  @Get()
  async getArea() {
    return await this.areaRepository.find();
  }
}
