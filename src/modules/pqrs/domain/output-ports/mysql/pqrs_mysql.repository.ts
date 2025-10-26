import { IPqrsRepository } from '../pqrs.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PqrsEntity } from '../../../../../common/entities/pqrs.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class Pqrs_mysqlRepository implements IPqrsRepository {
  constructor(
    @InjectRepository(PqrsEntity)
    private readonly repository: Repository<PqrsEntity>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(entity: PqrsEntity): Promise<PqrsEntity> {
    return await this.entityManager.save(entity);
  }

  async findAll(): Promise<PqrsEntity[]> {
    return await this.repository.find({
      relations: [
        'pqrsType',
        'department',
        'municipality',
        'applicationStatus',
        'reason',
        'eps',
        'user',
      ],
    });
  }

  async findOneBy(condition: Partial<PqrsEntity>): Promise<PqrsEntity> {
    return await this.repository.findOne({
      where: condition,
      relations: [
        'pqrsType',
        'applicationStatus',
        'department',
        'municipality',
        'reason',
        'eps',
        'userSystem',
        'user',
        'user.identificationType',
        'user.department',
        'user.municipality',
        'user.gender',
        'user.area',
        'user.disabilityType',
        'notifications',
        'notifications.status',
      ],
    });
  }

  async update(entity: Partial<PqrsEntity>): Promise<PqrsEntity> {
    return this.repository.save(entity);
  }

  async findByAffiliateIdentification(
    identificationNumber: number,
  ): Promise<PqrsEntity[]> {
    return this.repository
      .createQueryBuilder('pqrs')
      .innerJoinAndSelect('pqrs.user', 'user') // Relación con userEntity
      .where('user.identificationNumber = :identificationNumber', {
        identificationNumber,
      })
      .getMany();
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
