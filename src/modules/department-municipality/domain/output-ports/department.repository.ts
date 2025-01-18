import { DepartmentEntity } from '../../../../common/entities/department.entity';

export interface IDepartmentRepository {
  findOneBy(id: Partial<DepartmentEntity>): Promise<DepartmentEntity>;
}
export const IDepartmentRepository = Symbol('IDepartmentRepository');
