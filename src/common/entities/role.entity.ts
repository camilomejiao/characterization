import { Column, Entity } from 'typeorm';
import { AbstractEntity } from './abstract.entity';

@Entity('role')
export class Role extends AbstractEntity<Role> {
  @Column()
  name: string;

  @Column()
  is_active: number;
}
