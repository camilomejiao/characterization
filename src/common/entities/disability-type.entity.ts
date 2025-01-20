import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('disability_type')
export class DisabilityTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
