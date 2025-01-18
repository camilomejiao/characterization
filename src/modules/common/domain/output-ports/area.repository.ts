import { AreaEntity } from '../../../../common/entities/area.entity';

export interface IAreaRepository {
  findOneBy(id: Partial<AreaEntity>): Promise<AreaEntity>;
}
export const IAreaRepository = Symbol('IAreaRepository');
