import { AbstractEntity } from './abstract.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { EpsEntity } from './eps.entity';
import { Population_typeEntity } from './population_type.entity';
import { EthnicityEntity } from './ethnicity.entity';
import { CommunityEntity } from './community.entity';

@Entity('special_population')
export class SpecialPopulationEntity extends AbstractEntity<SpecialPopulationEntity> {
  //user
  @OneToOne(() => UserEntity, (user) => user.specialPopulation, {
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  //Tipo de población
  @ManyToOne(() => Population_typeEntity, { nullable: true })
  @JoinColumn({ name: 'population_type_id' })
  populationType: Population_typeEntity;

  //Etnia
  @ManyToOne(() => EthnicityEntity, { nullable: true })
  @JoinColumn({ name: 'ethnicity_id' })
  ethnicity: EthnicityEntity;

  //Comunidad
  @ManyToOne(() => CommunityEntity, { nullable: true })
  @JoinColumn({ name: 'community_id' })
  community: CommunityEntity;

  //Eps
  @ManyToOne(() => EpsEntity, { nullable: true })
  @JoinColumn({ name: 'eps_id' })
  eps: EpsEntity;

  //
  @Column({
    name: 'has_eps_affiliate',
    type: 'boolean',
    nullable: true,
  })
  hasEpsAffiliate: boolean;

  //
  @Column({
    name: 'observations',
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  observations: string;
}
