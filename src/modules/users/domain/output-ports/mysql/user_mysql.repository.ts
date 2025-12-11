import { IUserRepository } from '../user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../../../../common/entities/user.entity';
import {
  FindOneOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { Injectable } from '@nestjs/common';

type RelationsInput<T> = FindOptionsRelations<T> | string[];

function normalizeRelations<T>(
  relations?: RelationsInput<T>,
): FindOneOptions<T>['relations'] {
  if (!relations) return undefined;
  if (Array.isArray(relations)) return relations as any;
  return relations as any; // objeto anidado
}

@Injectable()
export class User_mysqlRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async create(entity: UserEntity): Promise<UserEntity> {
    return await this.repository.save(entity);
  }

  async findOne(options: {
    where: FindOptionsWhere<UserEntity>;
    relations?: RelationsInput<UserEntity>;
  }): Promise<UserEntity | null> {
    return this.repository.findOne({
      where: options.where,
      relations: normalizeRelations<UserEntity>(options.relations),
    });
  }

  async findOneBy(
    condition: FindOptionsWhere<UserEntity>,
  ): Promise<UserEntity | null> {
    return this.repository.findOne({
      where: condition,
      relations: {
        identificationType: true,
        disabilityType: true,
        department: true,
        municipality: true,
        sex: true,
        area: true,
        country: true,
        organization: true,
        ethnicity: true,
      },
    });
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.repository.find({
      relations: {
        department: true,
        municipality: true,
        identificationType: true,
        disabilityType: true,
        sex: true,
        area: true,
        country: true,
        organization: true,
        ethnicity: true,
      },
    });
  }

  async update(
    id: number,
    userData: Partial<UserEntity>,
  ): Promise<UserEntity | null> {
    await this.repository.update(id, userData);
    return this.repository.findOne({
      where: { id },
      relations: {
        department: true,
        municipality: true,
        identificationType: true,
        disabilityType: true,
        sex: true,
        area: true,
        country: true,
        organization: true,
        ethnicity: true,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
