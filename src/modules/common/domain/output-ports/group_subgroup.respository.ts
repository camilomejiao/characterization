import { Group_subgroupEntity } from '../../../../common/entities/group_subgroup.entity';

export interface IGroupSubgroupRespository {
  findOneBy(id: Partial<Group_subgroupEntity>): Promise<Group_subgroupEntity>;
}
export const IGroupSubgroupRespository = Symbol('IGroupSubgroupRespository');
