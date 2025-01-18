import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ILevelRepository } from '../level.repository';
import { LevelEntity } from '../../../../../common/entities/level.entity';

@Injectable()
export class LevelMysqlRepository implements ILevelRepository {
  constructor(
    @InjectRepository(LevelEntity)
    private readonly repository: Repository<LevelEntity>,
  ) {}

  async findOneBy(id: Partial<LevelEntity>): Promise<LevelEntity> {
    return await this.repository.findOneBy(id);
  }
}
