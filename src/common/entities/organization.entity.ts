import { AbstractEntity } from './abstract.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { DepartmentEntity } from './department.entity';
import { MunicipalityEntity } from './municipality.entity';

@Entity('organization')
export class OrganizationEntity extends AbstractEntity<OrganizationEntity> {
  @Column()
  nit: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  file_1: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  file_2: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  file_3: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  file_4: string;

  @Column({ type: 'tinyint', default: () => '1' })
  active: number;

  @ManyToOne(() => DepartmentEntity, (department) => department.id, {
    nullable: true,
  })
  @JoinColumn({ name: 'department_id' })
  department: DepartmentEntity;

  @ManyToOne(() => MunicipalityEntity, (municipality) => municipality.id, {
    nullable: true,
  })
  @JoinColumn({ name: 'municipality_id' })
  municipality: MunicipalityEntity;
}
