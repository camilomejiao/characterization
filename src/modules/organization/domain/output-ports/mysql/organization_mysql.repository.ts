import { IOrganizationRepository } from '../organization.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { OrganizationEntity } from '../../../../../common/entities/organization.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class OrganizationMysqlRepository implements IOrganizationRepository {
  constructor(
    @InjectRepository(OrganizationEntity)
    private readonly repository: Repository<OrganizationEntity>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(entity: OrganizationEntity): Promise<OrganizationEntity> {
    return await this.entityManager.save(entity);
  }

  async findOneBy(
    condition: Partial<OrganizationEntity>,
  ): Promise<OrganizationEntity> {
    return await this.repository.findOneBy(condition);
  }

  async getOrganization(
    condition: Partial<OrganizationEntity>,
  ): Promise<OrganizationEntity | null> {
    return this.repository.findOne({
      where: condition,
      relations: { department: true, municipality: true },
    });
  }

  async findAll(): Promise<OrganizationEntity[]> {
    return await this.repository.find();
  }

  async update(entity: OrganizationEntity): Promise<OrganizationEntity> {
    const organization = await this.repository.save(entity);
    return this.repository.findOne({
      where: { id: organization.id },
      relations: {
        department: true,
        municipality: true,
      }, //Recargar relaciones
    });
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async toggleStatus(id: number, active: number): Promise<OrganizationEntity> {
    await this.repository.update(id, { active: active });
    return this.repository.findOneBy({ id });
  }
}
