import { Entity, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { UserEntity } from './user.entity';
import { PopulationTypeEntity } from './population-type.entity';
import { EpsEntity } from './eps.entity';
import { AffiliateTypeEntity } from './affiliate-type.entity';
import { MethodologyEntity } from './methodology.entity';
import { LevelEntity } from './level.entity';
import { MembershipClassEntity } from './membership-class.entity';
import { EthnicityEntity } from './ethnicity.entity';
import { CommunityEntity } from './community.entity';
import { GroupSubgroupEntity } from './group-subgroup.entity';
import { AffiliatedStateEntity } from './affiliated-state.entity';
import { DepartmentEntity } from './department.entity';
import { MunicipalityEntity } from './municipality.entity';

@Entity('affiliates')
export class AffiliatesEntity extends AbstractEntity<AffiliatesEntity> {
  @OneToOne(() => UserEntity, (user) => user.affiliate, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  //Tipo de población
  @ManyToOne(() => PopulationTypeEntity, { nullable: true })
  @JoinColumn({ name: 'population_type_id' })
  populationType: PopulationTypeEntity;

  //Eps
  @ManyToOne(() => EpsEntity, { nullable: true })
  @JoinColumn({ name: 'eps_id' })
  eps: EpsEntity;

  //State
  @ManyToOne(() => AffiliatedStateEntity, { nullable: true })
  @JoinColumn({ name: 'state_id' })
  state: AffiliatedStateEntity;

  //Tipo de afiliciación
  @ManyToOne(() => AffiliateTypeEntity, { nullable: true })
  @JoinColumn({ name: 'affiliate_type_id' })
  affiliateType: AffiliateTypeEntity;

  //Metodologia
  @ManyToOne(() => MethodologyEntity, { nullable: true })
  @JoinColumn({ name: 'methodology_id' })
  methodology: MethodologyEntity;

  //Nivel del sisben
  @ManyToOne(() => LevelEntity, { nullable: true })
  @JoinColumn({ name: 'level_id' })
  level: LevelEntity;

  //Tipo de afiliación
  @ManyToOne(() => MembershipClassEntity, { nullable: true })
  @JoinColumn({ name: 'membership_class_id' })
  membershipClass: MembershipClassEntity;

  //Etnia
  @ManyToOne(() => EthnicityEntity, { nullable: true })
  @JoinColumn({ name: 'ethnicity_id' })
  ethnicity: EthnicityEntity;

  //Comunidad
  @ManyToOne(() => CommunityEntity, { nullable: true })
  @JoinColumn({ name: 'community_id' })
  community: CommunityEntity;

  //Grupo y Subgrupo de sisben
  @ManyToOne(() => GroupSubgroupEntity, { nullable: true })
  @JoinColumn({ name: 'group_subgroup_id' })
  groupSubgroup: GroupSubgroupEntity;

  @ManyToOne(() => DepartmentEntity)
  @JoinColumn({ name: 'department_survival_id' })
  department: DepartmentEntity;

  @ManyToOne(() => MunicipalityEntity)
  @JoinColumn({ name: 'municipality_survival_id' })
  municipality: MunicipalityEntity;

  @Column({
    name: 'sisben_number',
    type: 'varchar',
    length: 25,
    nullable: true,
  })
  sisbenNumber: string;

  @Column({
    name: 'observations',
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  observations: string;

  @Column({ name: 'date_of_affiliated', type: 'date', nullable: true })
  dateOfAffiliated: string;
}
