import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { DepartmentEntity } from './department.entity';

@Entity('municipalities')
export class MunicipalityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: number;

  @Column()
  name: string;

  @Column()
  departmentId: number;

  @ManyToOne(() => DepartmentEntity, (department) => department.municipalities)
  department: DepartmentEntity;
}
