import { ISystemUserRepository } from '../system-user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { SystemUsersEntity } from '../../../../../common/entities/system-users.entity';
import { EntityManager, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SystemUserMysqlRepository implements ISystemUserRepository {
  constructor(
    @InjectRepository(SystemUsersEntity)
    private readonly repository: Repository<SystemUsersEntity>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(entity: SystemUsersEntity): Promise<SystemUsersEntity> {
    return await this.entityManager.save(entity);
  }

  async findOneBy(
    condition: Partial<SystemUsersEntity>,
  ): Promise<SystemUsersEntity> {
    return await this.repository.findOneBy(condition);
  }

  async getUser(
    condition: Partial<SystemUsersEntity>,
  ): Promise<SystemUsersEntity> {
    return await this.repository.findOneBy(condition);
  }
}
