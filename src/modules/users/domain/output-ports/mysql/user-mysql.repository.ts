import { IUserRepository } from '../user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../../../../common/entities/user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserMysqlRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async create(entity: UserEntity): Promise<UserEntity> {
    return await this.repository.save(entity);
  }

  async findOne(options: {
    where: Partial<UserEntity>;
    relations?: string[];
  }): Promise<UserEntity> {
    return this.repository.findOne({
      where: options.where,
      relations: options.relations || [],
    });
  }

  async findOneBy(condition: Partial<UserEntity>): Promise<UserEntity> {
    return this.repository.findOne({
      where: condition,
      relations: [
        'identificationType',
        'disabilityType',
        'department',
        'municipality',
        'gender',
        'area',
        'country',
      ],
    });
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.repository.find({
      relations: [
        'department',
        'municipality',
        'identificationType',
        'disabilityType',
        'gender',
        'area',
        'country',
      ],
    });
  }

  async update(id: number, userData: Partial<UserEntity>): Promise<UserEntity> {
    await this.repository.update(id, userData);
    return this.repository.findOne({
      where: { id },
      relations: [
        'department',
        'municipality',
        'identificationType',
        'disabilityType',
        'gender',
        'area',
        'country',
      ],
    });
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
