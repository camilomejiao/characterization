import { LevelEntity } from '../../../../common/entities/level.entity';

export interface ILevelRepository {
  findOneBy(id: Partial<LevelEntity>): Promise<LevelEntity>;
}
export const ILevelRepository = Symbol('ILevelRepository');
