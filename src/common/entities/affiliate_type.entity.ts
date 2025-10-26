import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('affiliate_type')
export class Affiliate_typeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
