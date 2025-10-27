import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { DepartmentEntity } from './department.entity';
import { MunicipalityEntity } from './municipality.entity';
import { Identification_typeEntity } from './identification_type.entity';
import { Disability_typeEntity } from './disability_type.entity';
import { SexEntity } from './sex.entity';
import { GenderEntity } from './gender.entity';
import { AreaEntity } from './area.entity';
import { PqrsEntity } from './pqrs.entity';
import { AffiliatesEntity } from './affiliate.entity';
import { CountryEntity } from './country.entity';
import { SpecialPopulationEntity } from './special_population.entity';

@Entity('users')
export class UserEntity extends AbstractEntity<UserEntity> {
  @ManyToOne(() => DepartmentEntity)
  @JoinColumn({ name: 'department_id' })
  department: DepartmentEntity;

  @ManyToOne(() => MunicipalityEntity)
  @JoinColumn({ name: 'municipality_id' })
  municipality: MunicipalityEntity;

  @ManyToOne(() => Identification_typeEntity)
  @JoinColumn({ name: 'identification_type_id' })
  identificationType: Identification_typeEntity;

  @Column({ name: 'identification_number', unique: true })
  identificationNumber: number;

  @ManyToOne(() => Disability_typeEntity, { nullable: true })
  @JoinColumn({ name: 'disability_type_id' })
  disabilityType: Disability_typeEntity;

  @ManyToOne(() => SexEntity)
  @JoinColumn({ name: 'sex_id' })
  sex: SexEntity;

  @ManyToOne(() => GenderEntity)
  @JoinColumn({ name: 'gender_id' })
  gender: GenderEntity;

  @ManyToOne(() => AreaEntity, { nullable: true })
  @JoinColumn({ name: 'area_id' })
  area: AreaEntity;

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

  @Column({
    name: 'neighborhood',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  neighborhood: string;

  @Column({ name: 'address', type: 'varchar', length: 100, nullable: true })
  address: string;

  @OneToOne(() => AffiliatesEntity, (affiliate) => affiliate.user, {
    nullable: true,
  })
  affiliate: AffiliatesEntity;

  @OneToMany(() => PqrsEntity, (pqrs) => pqrs.user)
  pqrs: PqrsEntity[];

  @ManyToOne(() => CountryEntity)
  @JoinColumn({ name: 'country_id' })
  country: CountryEntity;

  @OneToOne(
    () => SpecialPopulationEntity,
    (specialPopulation) => specialPopulation.user,
    {
      nullable: true,
    },
  )
  specialPopulation: SpecialPopulationEntity;
}
