import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { RoleEntity } from './role.entity';
import { DepartmentEntity } from './department.entity';
import { MunicipalityEntity } from './municipality.entity';

@Entity('system_user')
export class System_usersEntity extends AbstractEntity<System_usersEntity> {
  @Column()
  name: string;

  @Column({ nullable: true, unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  organizationName: string;

  @Column({ type: 'boolean', default: true })
  active: number;

  @ManyToOne(() => RoleEntity, (role) => role.id)
  @JoinColumn({ name: 'role_id' })
  role: RoleEntity;

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
