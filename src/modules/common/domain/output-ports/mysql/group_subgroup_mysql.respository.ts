import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IGroupSubgroupRespository } from '../group_subgroup.respository';
import { Group_subgroupEntity } from '../../../../../common/entities/group_subgroup.entity';

@Injectable()
export class Group_subgroup_mysqlRespository
  implements IGroupSubgroupRespository
{
  constructor(
    @InjectRepository(Group_subgroupEntity)
    private readonly repository: Repository<Group_subgroupEntity>,
  ) {}

  async findOneBy(
    id: Partial<Group_subgroupEntity>,
  ): Promise<Group_subgroupEntity> {
    return await this.repository.findOneBy(id);
  }
}
