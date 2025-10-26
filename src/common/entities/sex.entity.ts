import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sex')
export class SexEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
