import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('population_type')
export class Population_typeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
