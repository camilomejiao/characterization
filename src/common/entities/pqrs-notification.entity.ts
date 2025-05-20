import { AbstractEntity } from './abstract.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { PqrsEntity } from './pqrs.entity';

@Entity('pqrs_notification')
export class PqrsNotificationEntity extends AbstractEntity<PqrsNotificationEntity> {
  @ManyToOne(() => PqrsEntity, (pqrs) => pqrs.notifications)
  @JoinColumn({ name: 'pqrs_id' })
  pqrs: PqrsEntity;

  @Column({ type: 'varchar', length: 255, nullable: false })
  notification: string;
}
