import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { DepartmentEntity } from './department.entity';
import { MunicipalityEntity } from './municipality.entity';
import { IdentificationTypeEntity } from './identification-type.entity';
import { PopulationTypeEntity } from './population-type.entity';
import { EpsEntity } from './eps.entity';
import { DisabilityTypeEntity } from './disability-type.entity';
import { GenderEntity } from './gender.entity';
import { AffiliateTypeEntity } from './affiliate-type.entity';
import { AreaEntity } from './area.entity';
import { MethodologyEntity } from './methodology.entity';
import { LevelEntity } from './level.entity';
import { MembershipClassEntity } from './membership-class.entity';
import { EthnicityEntity } from './ethnicity.entity';
import { CommunityEntity } from './community.entity';

@Entity('affiliates')
export class AffiliatesEntity extends AbstractEntity<AffiliatesEntity> {
  @ManyToOne(() => DepartmentEntity)
  @JoinColumn({ name: 'department_id' })
  department: DepartmentEntity;

  @ManyToOne(() => MunicipalityEntity)
  @JoinColumn({ name: 'municipality_id' })
  municipality: MunicipalityEntity;

  @ManyToOne(() => IdentificationTypeEntity)
  @JoinColumn({ name: 'identification_type_id' })
  identificationType: IdentificationTypeEntity;

  @Column({ name: 'identification_number' })
  identificationNumber: number;

  @ManyToOne(() => PopulationTypeEntity)
  @JoinColumn({ name: 'population_type_id' })
  populationType: PopulationTypeEntity;

  @ManyToOne(() => EpsEntity)
  @JoinColumn({ name: 'eps_id' })
  eps: EpsEntity;

  @ManyToOne(() => DisabilityTypeEntity)
  @JoinColumn({ name: 'disability_type_id' })
  disabilityType: DisabilityTypeEntity;

  @ManyToOne(() => GenderEntity)
  @JoinColumn({ name: 'gender_id' })
  gender: GenderEntity;

  @ManyToOne(() => AffiliateTypeEntity)
  @JoinColumn({ name: 'affiliate_type_id' })
  affiliateType: AffiliateTypeEntity;

  @ManyToOne(() => AreaEntity)
  @JoinColumn({ name: 'area_id' })
  area: AreaEntity;

  @ManyToOne(() => MethodologyEntity)
  @JoinColumn({ name: 'methodology_id' })
  methodology: MethodologyEntity;

  @ManyToOne(() => LevelEntity)
  @JoinColumn({ name: 'level_id' })
  level: LevelEntity;

  @ManyToOne(() => MembershipClassEntity)
  @JoinColumn({ name: 'membership_class_id' })
  membershipClass: MembershipClassEntity;

  @ManyToOne(() => EthnicityEntity)
  @JoinColumn({ name: 'ethnicity_id' })
  ethnicity: EthnicityEntity;

  @ManyToOne(() => CommunityEntity)
  @JoinColumn({ name: 'community_id' })
  community: CommunityEntity;

  @Column({ name: 'first_name', type: 'varchar', length: 100 })
  firstName: string;

  @Column({ name: 'middle_name', type: 'varchar', length: 100, nullable: true })
  middleName: string;

  @Column({ name: 'first_last_name', type: 'varchar', length: 100 })
  firstLastName: string;

  @Column({
    name: 'middle_last_name',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  middleLastName: string;

  @Column({ type: 'date' })
  birthdate: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  email: string;

  @Column({ name: 'phone_number', type: 'varchar', length: 20, nullable: true })
  phoneNumber: string;
}
