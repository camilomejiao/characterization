import { CommunityEntity } from '../../../../common/entities/community.entity';

export interface ICommunityRepository {
  findOneBy(id: Partial<CommunityEntity>): Promise<CommunityEntity>;
}
export const ICommunityRepository = Symbol('ICommunityRepository');
