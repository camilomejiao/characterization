import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('membership-class')
export class MembershipClassEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
