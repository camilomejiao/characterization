import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { AffiliatesEntity } from './affiliate.entity';

@Entity('lma')
export class LMAEntity extends AbstractEntity<LMAEntity> {
  //
  @ManyToOne(() => AffiliatesEntity, { nullable: false })
  @JoinColumn({ name: 'affiliate_id' })
  affiliate: AffiliatesEntity;

  @Column({
    name: 'description',
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  description: string;

  @Column({
    name: 'paid',
    type: 'decimal',
    precision: 14,
    scale: 2,
    nullable: true,
  })
  paid: string;

  @Column({
    name: 'month',
    nullable: true,
    type: 'int',
  })
  month: number;

  @Column({
    name: 'year',
    nullable: true,
    type: 'int',
  })
  year: number;
}
