import { ISystemUserRepository } from '../system-user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { SystemUsers } from '../../../../../common/entities/system-users.entity';
import { EntityManager, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SystemUserMysqlRepository implements ISystemUserRepository {
  constructor(
    @InjectRepository(SystemUsers)
    private readonly repository: Repository<SystemUsers>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(entity: SystemUsers): Promise<SystemUsers> {
    return await this.entityManager.save(entity);
  }

  async findOneBy(condition: Partial<SystemUsers>): Promise<SystemUsers> {
    return await this.repository.findOneBy(condition); // Implementación usando TypeORM
  }

  async getUser(condition: Partial<SystemUsers>): Promise<SystemUsers> {
    return await this.repository.findOneBy(condition);
  }
}
