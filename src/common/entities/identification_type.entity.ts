import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('identification_type')
export class Identification_typeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  acronym: string;

  @Column()
  name: string;
}
