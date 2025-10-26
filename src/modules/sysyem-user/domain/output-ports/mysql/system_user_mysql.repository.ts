import { ISystemUserRepository } from '../system_user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { System_usersEntity } from '../../../../../common/entities/system_users.entity';
import { EntityManager, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class System_user_mysqlRepository implements ISystemUserRepository {
  constructor(
    @InjectRepository(System_usersEntity)
    private readonly repository: Repository<System_usersEntity>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(entity: System_usersEntity): Promise<System_usersEntity> {
    return await this.entityManager.save(entity);
  }

  async findOneBy(
    condition: Partial<System_usersEntity>,
  ): Promise<System_usersEntity> {
    return await this.repository.findOneBy(condition);
  }

  async getUser(
    condition: Partial<System_usersEntity>,
  ): Promise<System_usersEntity | null> {
    return this.repository.findOne({
      where: condition,
      relations: ['role', 'department', 'municipality'],
    });
  }

  async findAll(): Promise<System_usersEntity[]> {
    return await this.repository.find();
  }

  async update(entity: System_usersEntity): Promise<System_usersEntity> {
    const updatedUser = await this.repository.save(entity);
    return this.repository.findOne({
      where: { id: updatedUser.id },
      relations: ['role', 'department', 'municipality'], //Recargar relaciones
    });
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async toggleStatus(id: number, active: number): Promise<System_usersEntity> {
    await this.repository.update(id, { active: active });
    return this.repository.findOneBy({ id });
  }
}
