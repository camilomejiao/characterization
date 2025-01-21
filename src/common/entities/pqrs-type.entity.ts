import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pqrs_type')
export class PqrsTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;
}
