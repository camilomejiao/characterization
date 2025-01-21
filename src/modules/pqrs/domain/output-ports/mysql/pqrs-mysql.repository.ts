import { IPqrsRepository } from '../pqrs.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PqrsEntity } from '../../../../../common/entities/pqrs.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class PqrsMysqlRepository implements IPqrsRepository {
  constructor(
    @InjectRepository(PqrsEntity)
    private readonly repository: Repository<PqrsEntity>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(entity: PqrsEntity): Promise<PqrsEntity> {
    return await this.entityManager.save(entity);
  }

  async findOneBy(condition: Partial<PqrsEntity>): Promise<PqrsEntity> {
    return await this.repository.findOneBy(condition);
  }

  async update(entity: Partial<PqrsEntity>): Promise<PqrsEntity> {
    return this.repository.save(entity);
  }

  async findByAffiliateIdentification(
    identificationNumber: number,
  ): Promise<PqrsEntity[]> {
    return this.repository
      .createQueryBuilder('pqrs')
      .innerJoinAndSelect('pqrs.user', 'user') // Relación con AffiliatesEntity
      .where('user.identificationNumber = :identificationNumber', {
        identificationNumber,
      })
      .getMany();
  }
}
