import { GenderEntity } from '../../../../common/entities/gender.entity';

export interface IGenderRepository {
  findOneBy(id: Partial<GenderEntity>): Promise<GenderEntity>;
}
export const IGenderRepository = Symbol('IGenderRepository');
