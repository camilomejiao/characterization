import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reason')
export class Reason_pqrsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
