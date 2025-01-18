import { Controller, Get } from '@nestjs/common';
import { DepartmentEntity } from '../../../../common/entities/department.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('departments')
export class DepartmentController {
  constructor(
    @InjectRepository(DepartmentEntity)
    private readonly departmentRepository: Repository<DepartmentEntity>,
  ) {}

  @Get()
  async getDepartments() {
    return await this.departmentRepository.find();
  }
}
