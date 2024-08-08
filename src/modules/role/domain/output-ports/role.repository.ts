import { Role } from '../../../../common/entities/role.entity';

export interface IRoleRepository {
  create(entity: Partial<Role>): Promise<Role>;
}
export const IRoleRepository = Symbol('IRoleRepository');
