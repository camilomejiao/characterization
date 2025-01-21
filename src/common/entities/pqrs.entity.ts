import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { PqrsTypeEntity } from './pqrs-type.entity';
import { ApplicationStatusEntity } from './application-status.entity';
import { DepartmentEntity } from './department.entity';
import { MunicipalityEntity } from './municipality.entity';
import { AffiliatesEntity } from './affiliate.entity';

@Entity('pqrs')
export class PqrsEntity extends AbstractEntity<PqrsEntity> {
  @ManyToOne(() => PqrsTypeEntity)
  @JoinColumn({ name: 'pqrs_type_id' })
  pqrsType: PqrsTypeEntity;

  @ManyToOne(() => ApplicationStatusEntity)
  @JoinColumn({ name: 'application_status_id' })
  applicationStatus: ApplicationStatusEntity;

  @ManyToOne(() => DepartmentEntity)
  @JoinColumn({ name: 'department_id' })
  department: DepartmentEntity;

  @ManyToOne(() => MunicipalityEntity)
  @JoinColumn({ name: 'municipality_id' })
  municipality: MunicipalityEntity;

  @ManyToOne(() => AffiliatesEntity)
  @JoinColumn({ name: 'user_id' })
  user: AffiliatesEntity;

  @Column({ type: 'varchar', length: 255, nullable: false })
  reason: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  entity: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  responsible: string;

  @Column({ name: 'date_of_events', type: 'date', nullable: false })
  dateOfEvents: string;

  @Column({ name: 'description_of_events', type: 'text', nullable: false })
  descriptionOfEvents: string;

  @Column({ name: 'address', type: 'varchar', length: 255, nullable: false })
  address: string;
}
