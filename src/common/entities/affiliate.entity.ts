import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { UserEntity } from './user.entity';
import { Population_typeEntity } from './population_type.entity';
import { EpsEntity } from './eps.entity';
import { Affiliate_typeEntity } from './affiliate_type.entity';
import { MethodologyEntity } from './methodology.entity';
import { LevelEntity } from './level.entity';
import { Membership_classEntity } from './membership_class.entity';
import { EthnicityEntity } from './ethnicity.entity';
import { Group_subgroupEntity } from './group_subgroup.entity';
import { Affiliated_stateEntity } from './affiliated_state.entity';
import { RegimeEntity } from './regime.entity';
import { Ips_dentalEntity } from './ips_dental.entity';
import { Ips_primaryEntity } from './ips_primary.entity';
import { LMAEntity } from './lma.entity';
import { Affiliate_historyEntity } from './affiliate_history.entity';

@Entity('affiliates')
export class AffiliatesEntity extends AbstractEntity<AffiliatesEntity> {
  //user
  @OneToOne(() => UserEntity, (user) => user.affiliate, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  //Regimen
  @ManyToOne(() => RegimeEntity, { nullable: false })
  @JoinColumn({ name: 'regime_id' })
  regime: RegimeEntity;

  //Tipo de población
  @ManyToOne(() => Population_typeEntity, { nullable: true })
  @JoinColumn({ name: 'population_type_id' })
  populationType: Population_typeEntity;

  //Eps
  @ManyToOne(() => EpsEntity, { nullable: true })
  @JoinColumn({ name: 'eps_id' })
  eps: EpsEntity;

  //ips primaria
  @ManyToOne(() => Ips_primaryEntity, { nullable: false })
  @JoinColumn({ name: 'ips_primary_id' })
  ipsPrimary: Ips_primaryEntity;

  //ips odontologica
  @ManyToOne(() => Ips_dentalEntity, { nullable: false })
  @JoinColumn({ name: 'ips_dental_id' })
  ipsDental: Ips_dentalEntity;

  //State
  @ManyToOne(() => Affiliated_stateEntity, { nullable: true })
  @JoinColumn({ name: 'affiliated_state_id' })
  affiliatedState: Affiliated_stateEntity;

  //Tipo de afiliciación
  @ManyToOne(() => Affiliate_typeEntity, { nullable: true })
  @JoinColumn({ name: 'affiliate_type_id' })
  affiliateType: Affiliate_typeEntity;

  //Metodologia
  @ManyToOne(() => MethodologyEntity, { nullable: true })
  @JoinColumn({ name: 'methodology_id' })
  methodology: MethodologyEntity;

  //Nivel del sisben
  @ManyToOne(() => LevelEntity, { nullable: true })
  @JoinColumn({ name: 'level_id' })
  level: LevelEntity;

  //Tipo de afiliación
  @ManyToOne(() => Membership_classEntity, { nullable: true })
  @JoinColumn({ name: 'membership_class_id' })
  membershipClass: Membership_classEntity;

  //Etnia
  @ManyToOne(() => EthnicityEntity, { nullable: true })
  @JoinColumn({ name: 'ethnicity_id' })
  ethnicity: EthnicityEntity;

  //Grupo y Subgrupo de sisben
  @ManyToOne(() => Group_subgroupEntity, { nullable: true })
  @JoinColumn({ name: 'group_subgroup_id' })
  groupSubgroup: Group_subgroupEntity;

  @Column({
    name: 'sisben_number',
    type: 'varchar',
    length: 25,
    nullable: true,
  })
  sisbenNumber: string;

  @Column({
    name: 'form_number',
    type: 'varchar',
    length: 25,
    nullable: true,
  })
  formNumber: string;

  @Column({
    name: 'observations',
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  observations: string;

  @Column({ name: 'date_of_affiliated', type: 'date', nullable: true })
  dateOfAffiliated: string;

  @OneToMany(() => LMAEntity, (lma) => lma.affiliate)
  LMAUser: LMAEntity[];

  @OneToMany(() => Affiliate_historyEntity, (history) => history.affiliate)
  historyUser: Affiliate_historyEntity[];
}
