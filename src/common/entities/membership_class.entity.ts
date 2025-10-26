import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('membership_class')
export class Membership_classEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
