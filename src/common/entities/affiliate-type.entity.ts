import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('affiliate_type')
export class AffiliateTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
