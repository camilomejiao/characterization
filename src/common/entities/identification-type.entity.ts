import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('identification_type')
export class IdentificationTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  acronym: string;

  @Column()
  name: string;
}
