import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IGroupSubgroupRespository } from '../group-subgroup.respository';
import { GroupSubgroupEntity } from '../../../../../common/entities/group-subgroup.entity';

@Injectable()
export class GroupSubgroupMysqlRespository
  implements IGroupSubgroupRespository
{
  constructor(
    @InjectRepository(GroupSubgroupEntity)
    private readonly repository: Repository<GroupSubgroupEntity>,
  ) {}

  async findOneBy(
    id: Partial<GroupSubgroupEntity>,
  ): Promise<GroupSubgroupEntity> {
    return await this.repository.findOneBy(id);
  }
}
