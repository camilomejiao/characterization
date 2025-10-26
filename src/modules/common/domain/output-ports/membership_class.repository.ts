import { Membership_classEntity } from '../../../../common/entities/membership_class.entity';

export interface IMembershipClassRepository {
  findOneBy(
    id: Partial<Membership_classEntity>,
  ): Promise<Membership_classEntity>;
}
export const IMembershipClassRepository = Symbol('IMembershipClassRepository');
