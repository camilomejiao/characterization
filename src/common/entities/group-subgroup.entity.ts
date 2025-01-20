import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('group_subgroup')
export class GroupSubgroupEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subgroup: string;

  @Column()
  group: string;
}
