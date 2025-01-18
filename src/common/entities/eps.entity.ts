import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('eps')
export class EpsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  nit: string;
}
