import { ISpecialPopulationRepository } from '../special_population.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { SpecialPopulationEntity } from '../../../../../common/entities/special_population.entity';
import { EntityManager, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SpecialPopulationMysqlRepository
  implements ISpecialPopulationRepository
{
  constructor(
    @InjectRepository(SpecialPopulationEntity)
    private readonly repository: Repository<SpecialPopulationEntity>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(
    entity: SpecialPopulationEntity,
  ): Promise<SpecialPopulationEntity> {
    return await this.entityManager.save(entity);
  }

  async findAll(): Promise<SpecialPopulationEntity[]> {
    return await this.repository.find({
      relations: {
        user: true,
        populationType: true,
        eps: true,
        ethnicity: true,
        affiliatedState: true,
      },
    });
  }

  async findById(id): Promise<SpecialPopulationEntity> {
    return await this.repository.findOne({
      where: { id },
      relations: {
        user: true,
        populationType: true,
        eps: true,
        ethnicity: true,
        affiliatedState: true,
      },
    });
  }

  async findOneBy(
    condition: Partial<SpecialPopulationEntity>,
  ): Promise<SpecialPopulationEntity> {
    return await this.repository.findOneBy(condition);
  }

  async update(
    entity: Partial<SpecialPopulationEntity>,
  ): Promise<SpecialPopulationEntity> {
    return this.repository.save(entity);
  }
}
