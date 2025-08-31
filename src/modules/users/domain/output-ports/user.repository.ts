import { UserEntity } from '../../../../common/entities/user.entity';

export interface IUserRepository {
  create(entity: UserEntity): Promise<UserEntity>;

  findOne(options: {
    where: Partial<UserEntity>;
    relations?: string[];
  }): Promise<UserEntity>;

  findOneBy(condition: Partial<UserEntity>): Promise<UserEntity>;

  findAll(): Promise<UserEntity[]>;

  update(id: number, userData: Partial<UserEntity>): Promise<UserEntity>;

  delete(id: number): Promise<void>;
}

export const IUserRepository = Symbol('IUserRepository');
