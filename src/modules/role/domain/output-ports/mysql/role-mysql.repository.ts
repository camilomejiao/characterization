import { IRoleRepository } from '../role.repository';
import { Injectable } from '@nestjs/common';
import { Role } from '../../../../../common/entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class RoleMysqlRepository implements IRoleRepository {
  constructor(
    @InjectRepository(Role)
    private readonly repository: Repository<Role>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(entity: Role): Promise<Role> {
    return await this.entityManager.save(entity);
  }
}
