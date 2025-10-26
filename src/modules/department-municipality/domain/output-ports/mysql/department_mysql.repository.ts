import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IDepartmentRepository } from '../department.repository';
import { DepartmentEntity } from '../../../../../common/entities/department.entity';

@Injectable()
export class Department_mysqlRepository implements IDepartmentRepository {
  constructor(
    @InjectRepository(DepartmentEntity)
    private readonly repository: Repository<DepartmentEntity>,
  ) {}

  async findOneBy(id: Partial<DepartmentEntity>): Promise<DepartmentEntity> {
    return await this.repository.findOneBy(id);
  }
}
