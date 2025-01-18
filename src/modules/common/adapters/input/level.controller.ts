import { Controller, Get } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LevelEntity } from '../../../../common/entities/level.entity';

@Controller('level')
export class LevelController {
  constructor(
    @InjectRepository(LevelEntity)
    private readonly levelRepository: Repository<LevelEntity>,
  ) {}

  @Get()
  async getLevel() {
    return await this.levelRepository.find();
  }
}
