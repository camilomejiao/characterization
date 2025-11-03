import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { RoleEntity } from './role.entity';
import { OrganizationEntity } from './organization.entity';

@Entity('system_user')
export class System_usersEntity extends AbstractEntity<System_usersEntity> {
  @Column()
  name: string;

  @Column({ nullable: true, unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'tinyint', default: () => '1' })
  active: number;

  @ManyToOne(() => RoleEntity, (role) => role.id)
  @JoinColumn({ name: 'role_id' })
  role: RoleEntity;

  @ManyToOne(() => OrganizationEntity, (organization) => organization.id)
  @JoinColumn({ name: 'organization_id' })
  organization: OrganizationEntity;
}
