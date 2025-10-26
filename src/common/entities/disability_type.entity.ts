import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('disability_type')
export class Disability_typeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
