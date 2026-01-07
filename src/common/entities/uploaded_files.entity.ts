import { AbstractEntity } from './abstract.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { OrganizationEntity } from './organization.entity';
import { System_usersEntity } from './system_users.entity';

export enum UploadFileStatus {
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

@Entity('upload_files')
export class UploadedFilesEntity extends AbstractEntity<UploadedFilesEntity> {
  @ManyToOne(() => OrganizationEntity, (organization) => organization.id, {
    nullable: false,
  })
  @JoinColumn({ name: 'organization_id' })
  organization: OrganizationEntity;

  @ManyToOne(() => System_usersEntity, (user) => user.id, {
    nullable: false,
  })
  @JoinColumn({ name: 'system_user_id' })
  user: System_usersEntity;

  @Column({
    name: 'file_name',
    type: 'varchar',
    length: 200,
    nullable: false,
  })
  fileName: string;

  @Column({
    name: 'period',
    type: 'varchar',
    length: 6,
    nullable: false,
  })
  period: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: UploadFileStatus,
    default: UploadFileStatus.PROCESSING,
    nullable: false,
  })
  status: UploadFileStatus;
}
