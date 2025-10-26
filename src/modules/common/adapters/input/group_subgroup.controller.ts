import { Controller, Get } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Group_subgroupEntity } from '../../../../common/entities/group_subgroup.entity';

@Controller('group-subgroup')
export class Group_subgroupController {
  constructor(
    @InjectRepository(Group_subgroupEntity)
    private readonly groupSubgroupRepository: Repository<Group_subgroupEntity>,
  ) {}

  @Get()
  async getGroupSubgroup() {
    return await this.groupSubgroupRepository.find();
  }
}
