import { AbstractEntity } from './abstract.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AffiliatesEntity } from './affiliate.entity';

@Entity('affiliate_history')
export class Affiliate_historyEntity extends AbstractEntity<Affiliate_historyEntity> {
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
}
