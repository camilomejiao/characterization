import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('application_status')
export class ApplicationStatusEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;
}
