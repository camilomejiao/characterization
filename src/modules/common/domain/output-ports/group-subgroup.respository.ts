import { GroupSubgroupEntity } from '../../../../common/entities/group-subgroup.entity';

export interface IGroupSubgroupRespository {
  findOneBy(id: Partial<GroupSubgroupEntity>): Promise<GroupSubgroupEntity>;
}
export const IGroupSubgroupRespository = Symbol('IGroupSubgroupRespository');
