import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reason')
export class ReasonPqrsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
