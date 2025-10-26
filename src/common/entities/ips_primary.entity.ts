import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ips_primary')
export class Ips_primaryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
