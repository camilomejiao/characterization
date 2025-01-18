import { MembershipClassEntity } from '../../../../common/entities/membership-class.entity';

export interface IMembershipClassRepository {
  findOneBy(id: Partial<MembershipClassEntity>): Promise<MembershipClassEntity>;
}
export const IMembershipClassRepository = Symbol('IMembershipClassRepository');
