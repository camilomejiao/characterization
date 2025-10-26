import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('regime')
export class RegimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
