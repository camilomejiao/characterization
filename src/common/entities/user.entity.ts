import { Column, Entity } from 'typeorm';
import { AbstractEntity } from './abstract.entity';

@Entity('user')
export class User extends AbstractEntity<User> {
  @Column()
  name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ nullable: true })
  email: string;
}
