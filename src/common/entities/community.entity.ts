import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('community')
export class CommunityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
