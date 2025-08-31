import { Controller, Get } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupSubgroupEntity } from '../../../../common/entities/group-subgroup.entity';

@Controller('group-subgroup')
export class GroupSubgroupController {
  constructor(
    @InjectRepository(GroupSubgroupEntity)
    private readonly groupSubgroupRepository: Repository<GroupSubgroupEntity>,
  ) {}

  @Get()
  async getGroupSubgroup() {
    return await this.groupSubgroupRepository.find();
  }
}
