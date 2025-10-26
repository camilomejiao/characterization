import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('application_status')
export class Application_statusEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;
}
