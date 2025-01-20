import { SystemUsersEntity } from '../../../../common/entities/system-users.entity';

export interface ISystemUserRepository {
  create(entity: SystemUsersEntity): Promise<SystemUsersEntity>;

  findOneBy(condition: Partial<SystemUsersEntity>): Promise<SystemUsersEntity>;

  getUser(condition: Partial<SystemUsersEntity>): Promise<SystemUsersEntity>;
}

export const ISystemUserRepository = Symbol('ISystemUserRepository');
