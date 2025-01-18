import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('level')
export class LevelEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
