import { RoleEntity } from '../../../../common/entities/role.entity';

export interface IRoleRepository {
  create(entity: Partial<RoleEntity>): Promise<RoleEntity>;

  findAll(): Promise<RoleEntity[]>;

  findOneBy(condition: Partial<RoleEntity>): Promise<RoleEntity | null>;
}
export const IRoleRepository = Symbol('IRoleRepository');
