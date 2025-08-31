import { AbstractEntity } from './abstract.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { PqrsEntity } from './pqrs.entity';
import { ApplicationStatusEntity } from './application-status.entity';

@Entity('pqrs_notification')
export class PqrsNotificationEntity extends AbstractEntity<PqrsNotificationEntity> {
  @ManyToOne(() => PqrsEntity, (pqrs) => pqrs.notifications, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'pqrs_id' })
  pqrs: PqrsEntity;

  @ManyToOne(() => ApplicationStatusEntity, (status) => status.id, {})
  @JoinColumn({ name: 'status_id' })
  status: ApplicationStatusEntity;

  @Column({ type: 'varchar', length: 255, nullable: false })
  notification: string;
}
