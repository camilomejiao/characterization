import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ethnicity')
export class EthnicityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
