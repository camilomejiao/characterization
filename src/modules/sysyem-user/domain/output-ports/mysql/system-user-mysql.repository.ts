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
  ): Promise<SystemUsersEntity | null> {
    return this.repository.findOne({
      where: condition,
      relations: ['role', 'department', 'municipality'],
    });
  }

  async findAll(): Promise<SystemUsersEntity[]> {
    return await this.repository.find();
  }

  async update(entity: SystemUsersEntity): Promise<SystemUsersEntity> {
    const updatedUser = await this.repository.save(entity);
    return this.repository.findOne({
      where: { id: updatedUser.id },
      relations: ['role', 'department', 'municipality'], //Recargar relaciones
    });
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async toggleStatus(id: number, active: number): Promise<SystemUsersEntity> {
    await this.repository.update(id, { active: active });
    return this.repository.findOneBy({ id });
  }
}
