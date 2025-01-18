import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('disability-type')
export class DisabilityTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
