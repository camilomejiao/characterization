import { AbstractEntity } from './abstract.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { PqrsEntity } from './pqrs.entity';
import { Application_statusEntity } from './application_status.entity';

@Entity('pqrs_notification')
export class Pqrs_notificationEntity extends AbstractEntity<Pqrs_notificationEntity> {
  @ManyToOne(() => PqrsEntity, (pqrs) => pqrs.notifications, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'pqrs_id' })
  pqrs: PqrsEntity;

  @ManyToOne(() => Application_statusEntity, (status) => status.id, {})
  @JoinColumn({ name: 'status_id' })
  status: Application_statusEntity;

  @Column({ type: 'varchar', length: 255, nullable: false })
  notification: string;
}
