import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('affiliate-type')
export class AffiliateTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
