import { AbstractEntity } from './abstract.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { OrganizationEntity } from './organization.entity';
import { System_usersEntity } from './system_users.entity';

@Entity('upload_files')
export class UploadedFilesEntity extends AbstractEntity<UploadedFilesEntity> {
  @ManyToOne(() => OrganizationEntity, (organization) => organization.id)
  @JoinColumn({ name: 'organization_id' })
  organization: OrganizationEntity;

  @ManyToOne(() => System_usersEntity, (user) => user.id)
  @JoinColumn({ name: 'system_user_id' })
  user: System_usersEntity;

  @Column({
    name: 'file_name',
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  fileName: string;

  @Column({
    name: 'count',
    type: 'int',
    nullable: true,
  })
  count: number;
}
