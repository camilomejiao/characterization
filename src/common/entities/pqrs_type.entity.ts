import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pqrs_type')
export class Pqrs_typeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;
}
