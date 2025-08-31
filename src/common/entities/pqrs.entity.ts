import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { PqrsTypeEntity } from './pqrs-type.entity';
import { ApplicationStatusEntity } from './application-status.entity';
import { DepartmentEntity } from './department.entity';
import { MunicipalityEntity } from './municipality.entity';
import { UserEntity } from './user.entity';
import { ReasonPqrsEntity } from './reason-pqrs.entity';
import { PqrsNotificationEntity } from './pqrs-notification.entity';
import { EpsEntity } from './eps.entity';
import { SystemUsersEntity } from './system-users.entity';

@Entity('pqrs')
export class PqrsEntity extends AbstractEntity<PqrsEntity> {
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

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

  @ManyToOne(() => ReasonPqrsEntity)
  @JoinColumn({ name: 'reason_id' })
  reason: ReasonPqrsEntity;

  @ManyToOne(() => EpsEntity)
  @JoinColumn({ name: 'eps_id' })
  eps: EpsEntity;

  @Column({ type: 'varchar', length: 255, nullable: false })
  entity: string;

  @Column({ name: 'date_of_events', type: 'date', nullable: false })
  dateOfEvents: string;

  @Column({ name: 'description_of_events', type: 'text', nullable: false })
  descriptionOfEvents: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  files: string;

  @ManyToOne(() => SystemUsersEntity)
  @JoinColumn({ name: 'user_system_id' })
  userSystem: SystemUsersEntity;

  @OneToMany(
    () => PqrsNotificationEntity,
    (notification) => notification.pqrs,
    {
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  notifications: PqrsNotificationEntity[];
}
