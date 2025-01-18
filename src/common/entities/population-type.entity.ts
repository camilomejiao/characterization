import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('population-type')
export class PopulationTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
