import { SystemUsers } from '../../../../common/entities/system-users.entity';

export interface ISystemUserRepository {
  create(entity: SystemUsers): Promise<SystemUsers>;

  findOneBy(condition: Partial<SystemUsers>): Promise<SystemUsers>;

  getUser(condition: Partial<SystemUsers>): Promise<SystemUsers>;
}

export const ISystemUserRepository = Symbol('ISystemUserRepository');
