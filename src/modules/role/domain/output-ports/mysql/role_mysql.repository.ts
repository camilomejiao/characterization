import { IRoleRepository } from '../role.repository';
import { Injectable } from '@nestjs/common';
import { RoleEntity } from '../../../../../common/entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class Role_mysqlRepository implements IRoleRepository {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly repository: Repository<RoleEntity>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(entity: RoleEntity): Promise<RoleEntity> {
    return await this.entityManager.save(entity);
  }

  async findOneBy(condition: Partial<RoleEntity>): Promise<RoleEntity | null> {
    return await this.repository.findOneBy(condition);
  }

  async findAll(): Promise<RoleEntity[]> {
    return await this.repository.find(); // Implementa el método para obtener todos los registros
  }
}
