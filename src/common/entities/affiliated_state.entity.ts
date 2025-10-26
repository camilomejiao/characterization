import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('affiliated_state')
export class Affiliated_stateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cod: string;

  @Column()
  description: string;
}
