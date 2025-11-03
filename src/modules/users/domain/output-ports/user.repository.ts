import { UserEntity } from '../../../../common/entities/user.entity';
import { FindOptionsWhere, FindOptionsRelations } from 'typeorm';

type RelationsInput<T> = FindOptionsRelations<T> | string[];
export interface IUserRepository {
  create(entity: UserEntity): Promise<UserEntity>;

  findOne(options: {
    where: FindOptionsWhere<UserEntity>;
    relations?: RelationsInput<UserEntity>;
  }): Promise<UserEntity | null>;

  findOneBy(condition: Partial<UserEntity>): Promise<UserEntity>;

  findAll(): Promise<UserEntity[]>;

  update(id: number, userData: Partial<UserEntity>): Promise<UserEntity>;

  delete(id: number): Promise<void>;
}

export const IUserRepository = Symbol('IUserRepository');
