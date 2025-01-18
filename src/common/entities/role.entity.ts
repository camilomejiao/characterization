import { Column, Entity } from 'typeorm';
import { AbstractEntity } from './abstract.entity';

@Entity('role')
export class RoleEntity extends AbstractEntity<RoleEntity> {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  is_active: number;
}
