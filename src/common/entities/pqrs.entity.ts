import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { Pqrs_typeEntity } from './pqrs_type.entity';
import { Application_statusEntity } from './application_status.entity';
import { DepartmentEntity } from './department.entity';
import { MunicipalityEntity } from './municipality.entity';
import { UserEntity } from './user.entity';
import { Reason_pqrsEntity } from './reason_pqrs.entity';
import { Pqrs_notificationEntity } from './pqrs_notification.entity';
import { EpsEntity } from './eps.entity';
import { System_usersEntity } from './system_users.entity';

@Entity('pqrs')
export class PqrsEntity extends AbstractEntity<PqrsEntity> {
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => Pqrs_typeEntity)
  @JoinColumn({ name: 'pqrs_type_id' })
  pqrsType: Pqrs_typeEntity;

  @ManyToOne(() => Application_statusEntity)
  @JoinColumn({ name: 'application_status_id' })
  applicationStatus: Application_statusEntity;

  @ManyToOne(() => DepartmentEntity)
  @JoinColumn({ name: 'department_id' })
  department: DepartmentEntity;

  @ManyToOne(() => MunicipalityEntity)
  @JoinColumn({ name: 'municipality_id' })
  municipality: MunicipalityEntity;

  @ManyToOne(() => Reason_pqrsEntity)
  @JoinColumn({ name: 'reason_id' })
  reason: Reason_pqrsEntity;

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

  @ManyToOne(() => System_usersEntity)
  @JoinColumn({ name: 'user_system_id' })
  userSystem: System_usersEntity;

  @OneToMany(
    () => Pqrs_notificationEntity,
    (notification) => notification.pqrs,
    {
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  notifications: Pqrs_notificationEntity[];
}
