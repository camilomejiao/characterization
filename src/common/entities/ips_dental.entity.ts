import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ips_dental')
export class Ips_dentalEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
