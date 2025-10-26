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
    type: 'varchar',
    length: 25,
    nullable: true,
  })
  paid: string;
}
