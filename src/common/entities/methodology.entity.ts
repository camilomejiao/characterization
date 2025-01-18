import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('methodology')
export class MethodologyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
